import { supabase } from './supabase'

const getFunctionsBaseUrl = () => {
  const url = import.meta.env.VITE_SUPABASE_URL as string
  return `${url}/functions/v1/manage-auth-users`
}

const callManageAuthUsers = async <T>(action: string, payload?: Record<string, unknown>) => {
  const { data: sessionData } = await supabase.auth.getSession()
  const token = sessionData.session?.access_token

  if (!token) {
    throw new Error('Sessão inválida para executar operação de usuários')
  }

  const response = await fetch(getFunctionsBaseUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action, ...payload }),
  })

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error((json as { error?: string }).error || 'Erro ao chamar função de usuários')
  }

  return json as T
}

export interface ManagedAuthUser {
  id: string
  email: string
  name: string
  role: string
  status: 'Ativo' | 'Inativo'
  created_at: string
  last_sign_in_at: string | null
}

export const authUsersService = {
  list: async () => {
    const result = await callManageAuthUsers<{ users: ManagedAuthUser[] }>('list')
    return result.users
  },

  create: async (input: { name: string; email: string; role: string }) => {
    return callManageAuthUsers<{ user: ManagedAuthUser }>('create', input)
  },

  update: async (input: { id: string; name: string; email: string; role: string; status: 'Ativo' | 'Inativo' }) => {
    return callManageAuthUsers<{ user: ManagedAuthUser }>('update', input)
  },

  resetPassword: async (input: { email: string }) => {
    return callManageAuthUsers<{ success: boolean }>('reset_password', input)
  },
}
