import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Status = 'Ativo' | 'Inativo'
type AppRole = 'Administrador' | 'Operador' | 'Gerente'
type ProfileRole = 'admin' | 'user' | 'manager'

type AuthUserLike = {
  id: string
  email?: string | null
  created_at?: string
  last_sign_in_at?: string | null
  app_metadata?: {
    role?: AppRole
    status?: Status
    [key: string]: unknown
  }
  user_metadata?: {
    name?: string
    [key: string]: unknown
  }
}

const normalizeAppRole = (role?: string): AppRole => {
  if (role === 'Administrador' || role === 'Operador' || role === 'Gerente') {
    return role
  }

  if (role === 'admin') return 'Administrador'
  if (role === 'manager') return 'Gerente'

  return 'Operador'
}

const toProfileRole = (role: AppRole): ProfileRole => {
  if (role === 'Administrador') return 'admin'
  if (role === 'Gerente') return 'manager'
  return 'user'
}

const mapUser = (user: AuthUserLike | null) => {
  if (!user) {
    return null
  }

  const appRole = normalizeAppRole(user.app_metadata?.role)

  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email || 'Usuário',
    role: appRole,
    status: (user.app_metadata?.status || 'Ativo') as Status,
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at,
  }
}

const upsertProfile = async (
  admin: ReturnType<typeof createClient>,
  input: { id: string; name: string; appRole: AppRole },
) => {
  const { error } = await admin
    .from('profiles')
    .upsert(
      {
        id: input.id,
        name: input.name,
        role: toProfileRole(input.appRole),
      },
      { onConflict: 'id' },
    )

  if (error) {
    throw error
  }
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

    const requesterRole = requesterData.user.app_metadata?.role
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

      return new Response(JSON.stringify({ users: data.users.map(mapUser).filter(Boolean) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'create') {
      const { name, email, role } = body as { name: string; email: string; role: string }
      const appRole = normalizeAppRole(role)

      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
      })

      if (error) throw error

      if (!data.user) {
        throw new Error('Usuário não retornado após convite')
      }

      const { data: updatedData, error: updatedError } = await admin.auth.admin.updateUserById(data.user.id, {
        app_metadata: {
          ...(data.user.app_metadata || {}),
          role: appRole,
          status: 'Ativo',
        },
        user_metadata: {
          ...(data.user.user_metadata || {}),
          name,
        },
      })

      if (updatedError) throw updatedError

      await upsertProfile(admin, {
        id: data.user.id,
        name,
        appRole,
      })

      return new Response(JSON.stringify({ user: mapUser(updatedData.user as AuthUserLike) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'update') {
      const { id, name, email, role, status } = body as {
        id: string
        name: string
        email: string
        role: string
        status: Status
      }

      const appRole = normalizeAppRole(role)

      const { data, error } = await admin.auth.admin.updateUserById(id, {
        email,
        app_metadata: {
          role: appRole,
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
        appRole,
      })

      return new Response(JSON.stringify({ user: mapUser(data.user as AuthUserLike) }), {
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
