import { supabase } from './supabase'

type UserStatus = 'Ativo' | 'Inativo'

type ManageAuthUsersAction = 'create' | 'update_user'

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

  const { data, error } = await supabase.functions.invoke('manage-auth-users', {
    body: { action, ...payload },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (error) {
    throw new Error(error.message || 'Erro ao chamar função de usuários')
  }

  return data as T
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

    if (error) throw error

    return (data ?? []) as ManagedProfileUser[]
  },

  create: async (input: CreateManagedAuthUserInput) => {
    return callManageAuthUsers<{ success: boolean; userId: string }>('create', {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      status: input.status ?? 'Ativo',
    })
  },

  updateProfile: async (input: UpdateManagedProfileInput): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: input.name.trim(),
        role: input.role,
        status: input.status,
      })
      .eq('id', input.id)

    if (error) {
      throw error
    }
  },

  resetPassword: async (input: { email: string }): Promise<boolean> => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      input.email.trim().toLowerCase(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    )

    if (error) {
      throw new Error(error.message || 'Erro ao enviar redefinição de senha')
    }

    return true
  },
}