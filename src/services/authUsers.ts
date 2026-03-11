import { supabase } from './supabase'

type UserStatus = 'Ativo' | 'Inativo'

const getFunctionsBaseUrl = () => {
  const url = import.meta.env.VITE_SUPABASE_URL as string
  return `${url}/functions/v1/manage-auth-users`
}

type ManageAuthUsersAction = 'create' | 'reset_password'

const callManageAuthUsers = async <T>(
  action: ManageAuthUsersAction,
  payload?: Record<string, unknown>,
): Promise<T> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    throw new Error(sessionError.message || 'Erro ao obter sessão do usuário')
  }

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

export interface ManagedProfileUser {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  created_at?: string
}

export interface CreateManagedAuthUserInput {
  name: string
  email: string
  role: string
  status?: UserStatus
}

export interface UpdateManagedProfileInput {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
}

export const authUsersService = {
  listProfiles: async (): Promise<ManagedProfileUser[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, role, status, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return (data ?? []) as ManagedProfileUser[]
  },

  create: async (input: CreateManagedAuthUserInput) => {
    return callManageAuthUsers<{ success: boolean; userId: string }>('create', {
      ...input,
      email: input.email.trim().toLowerCase(),
      status: input.status ?? 'Ativo',
    })
  },

  updateProfile: async (input: UpdateManagedProfileInput): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: input.name,
        email: input.email.trim().toLowerCase(),
        role: input.role,
        status: input.status,
      })
      .eq('id', input.id)

    if (error) {
      throw error
    }
  },

  resetPassword: async (input: { email: string }): Promise<boolean> => {
    const result = await callManageAuthUsers<{ success?: boolean }>('reset_password', {
      email: input.email.trim().toLowerCase(),
    })

    return Boolean(result.success)
  },
}