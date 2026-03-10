import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Status = 'Ativo' | 'Inativo'

const mapUser = (user: any) => ({
  id: user.id,
  email: user.email || '',
  name: user.user_metadata?.name || user.email || 'Usuário',
  role: user.app_metadata?.role || 'Operador',
  status: (user.app_metadata?.status || 'Ativo') as Status,
  created_at: user.created_at,
  last_sign_in_at: user.last_sign_in_at,
})

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

      return new Response(JSON.stringify({ users: data.users.map(mapUser) }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'create') {
      const { name, email, role } = body as { name: string; email: string; role: string }
      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
      })

      if (error) throw error

      if (data.user) {
        await admin.auth.admin.updateUserById(data.user.id, {
          app_metadata: {
            ...(data.user.app_metadata || {}),
            role: role || 'Operador',
            status: 'Ativo',
          },
          user_metadata: {
            ...(data.user.user_metadata || {}),
            name,
          },
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
        role: string
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
