import { createClient, type User } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Status = 'Ativo' | 'Inativo'
type Role = 'Administrador' | 'Supervisor' | 'Operador'

type Profile = {
  id: string
  email: string | null
  name: string | null
  role: Role | null
  status: Status | null
}

const mapUser = (user: User, profile?: Profile) => ({
  id: user.id,
  email: profile?.email || user.email || '',
  name: profile?.name || user.user_metadata?.name || user.email || 'Usuário',
  role: profile?.role || user.app_metadata?.role || 'Operador',
  status: (profile?.status || user.app_metadata?.status || 'Ativo') as Status,
  created_at: user.created_at,
  last_sign_in_at: user.last_sign_in_at,
})

const fetchProfilesMap = async (admin: ReturnType<typeof createClient>, ids: string[]) => {
  if (ids.length === 0) return new Map<string, Profile>()

  const { data, error } = await admin
    .from('profiles')
    .select('id, email, name, role, status')
    .in('id', ids)

  if (error) throw error

  return new Map((data || []).map(profile => [profile.id as string, profile as Profile]))
}

const upsertProfile = async (
  admin: ReturnType<typeof createClient>,
  profile: { id: string; name: string; email: string; role: string; status: Status }
) => {
  const { error } = await admin.from('profiles').upsert(profile, { onConflict: 'id' })
  if (error) throw error
}

const resolveResetTargetEmail = async (
  admin: ReturnType<typeof createClient>,
  input: { id?: string; email?: string },
) => {
  const userId = String(input.id || '').trim()
  const normalizedEmail = String(input.email || '').trim().toLowerCase()

  if (userId) {
    const { data, error } = await admin.auth.admin.getUserById(userId)
    if (error) throw error

    const userEmail = String(data.user?.email || '').trim().toLowerCase()
    if (!userEmail) throw new Error('Usuário não possui e-mail válido para redefinição')

    return userEmail
  }

  if (!normalizedEmail) {
    throw new Error('Campo obrigatório: email')
  }

  return normalizedEmail
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !serviceRole) {
      throw new Error('Variáveis de ambiente do Supabase não configuradas')
    }

    const admin = createClient(supabaseUrl, serviceRole)
    const authHeader = req.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return jsonResponse({ error: 'Token ausente' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: requesterData, error: requesterError } = await admin.auth.getUser(token)

    if (requesterError || !requesterData.user) {
      return jsonResponse({ error: 'Token inválido' }, 401)
    }

    const { data: requesterProfile } = await admin
      .from('profiles')
      .select('role')
      .eq('id', requesterData.user.id)
      .maybeSingle()

    const requesterRole = requesterProfile?.role || requesterData.user.app_metadata?.role
    if (requesterRole !== 'Administrador') {
      return new Response(JSON.stringify({ error: 'Sem permissão para gerenciar usuários' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
    const action = String(body.action || '')

    if (action === 'list') {
      const { data, error } = await admin.auth.admin.listUsers()
      if (error) throw error

      const profilesMap = await fetchProfilesMap(admin, data.users.map(user => user.id))

      return new Response(JSON.stringify({ users: data.users.map(user => mapUser(user, profilesMap.get(user.id))) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'create') {
      const { name, email, role } = body as { name: string; email: string; role: Role }
      const normalizedEmail = String(email || '').trim().toLowerCase()
      const normalizedName = String(name || '').trim()
      const userRole = role || 'Operador'

      if (!normalizedName || !normalizedEmail) {
        return jsonResponse({ error: 'Campos obrigatórios: name e email' }, 400)
      }

      const { data: invitedData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(normalizedEmail, {
        data: { name: normalizedName },
      })

      if (inviteError) throw inviteError
      if (!invitedData.user) throw new Error('Usuário não retornado na criação')

      const { data: updatedData, error: updateError } = await admin.auth.admin.updateUserById(invitedData.user.id, {
        app_metadata: {
          ...(invitedData.user.app_metadata || {}),
          role: userRole,
          status: 'Ativo',
        },
        user_metadata: {
          ...(invitedData.user.user_metadata || {}),
          name: normalizedName,
        },
      })

      if (updateError) throw updateError

      await upsertProfile(admin, {
        id: invitedData.user.id,
        name: normalizedName,
        email: normalizedEmail,
        role: userRole,
        status: 'Ativo',
      })

      return jsonResponse({ user: mapUser(updatedData.user || invitedData.user) })
    }

    if (action === 'update') {
      const { id, name, email, role, status } = body as {
        id: string
        name: string
        email: string
        role: Role
        status: Status
      }

      const { data: existingUserData, error: existingUserError } = await admin.auth.admin.getUserById(id)
      if (existingUserError) throw existingUserError

      const { data, error } = await admin.auth.admin.updateUserById(id, {
        email,
        app_metadata: {
          ...(existingUserData.user?.app_metadata || {}),
          role,
          status,
        },
        user_metadata: {
          ...(existingUserData.user?.user_metadata || {}),
          name,
        },
      })

      if (error) throw error

      await upsertProfile(admin, {
        id,
        name,
        email,
        role,
        status,
      })

      return jsonResponse({ user: mapUser(data.user, { id, name, email, role, status }) })
    }

    if (action === 'reset_password') {
      const redirectTo = String(body.redirectTo || '').trim()
      const email = await resolveResetTargetEmail(admin, {
        id: String(body.id || ''),
        email: String(body.email || ''),
      })

      const fallbackRedirect = `${Deno.env.get('SITE_URL') || 'http://localhost:5173'}/reset-password`
      const preferredRedirect = redirectTo || fallbackRedirect

      let resetError: Error | null = null

      const firstAttempt = await admin.auth.resetPasswordForEmail(email, {
        redirectTo: preferredRedirect,
      })

      if (firstAttempt.error) {
        resetError = firstAttempt.error

        // fallback para ambientes onde redirectTo não está liberado na allowlist do projeto
        const secondAttempt = await admin.auth.resetPasswordForEmail(email)
        if (secondAttempt.error) {
          resetError = secondAttempt.error
        } else {
          resetError = null
        }
      }

      if (resetError) throw resetError

      return jsonResponse({ success: true, email })
    }

    return jsonResponse({ error: 'Ação inválida' }, 400)
  } catch (error) {
    console.error(error)
    return jsonResponse({ error: (error as Error).message || 'Erro interno' }, 500)
  }
})
