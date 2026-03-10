import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

const mapUser = (user: any, profile?: Profile) => ({
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

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Token ausente' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: requesterData, error: requesterError } = await admin.auth.getUser(token)

    if (requesterError || !requesterData.user) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
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

    const body = await req.json()
    const action = body.action as string

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
      const userRole = role || 'Operador'
      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
      })

      if (error) throw error

      if (data.user) {
        await admin.auth.admin.updateUserById(data.user.id, {
          app_metadata: {
            ...(data.user.app_metadata || {}),
            role: userRole,
            status: 'Ativo',
          },
          user_metadata: {
            ...(data.user.user_metadata || {}),
            name,
          },
        })

        await upsertProfile(admin, {
          id: data.user.id,
          name,
          email,
          role: userRole,
          status: 'Ativo',
        })
      }

      return new Response(JSON.stringify({ user: mapUser(data.user) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'update') {
      const { id, name, email, role, status } = body as {
        id: string
        name: string
        email: string
        role: Role
        status: Status
      }

      const { data, error } = await admin.auth.admin.updateUserById(id, {
        email,
        app_metadata: {
          role: role || 'Operador',
          status: status || 'Ativo',
        },
        user_metadata: {
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

      return new Response(JSON.stringify({ user: mapUser(data.user) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'reset_password') {
      const { email } = body as { email: string }
      const { error } = await admin.auth.resetPasswordForEmail(email, {
        redirectTo: `${Deno.env.get('SITE_URL') || 'http://localhost:5173'}/reset-password`,
      })

      if (error) throw error

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Ação inválida' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: (error as Error).message || 'Erro interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
