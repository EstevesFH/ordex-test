import { supabase, supabaseAnonKey, supabaseUrl } from './supabase'

type UserStatus = 'Ativo' | 'Inativo'

type ManageAuthUsersAction = 'list' | 'create' | 'update' | 'reset_password'

const formatInvokeError = (error: unknown): Error => {
  if (error instanceof Error) {
    const details = (error as Error & { context?: unknown; cause?: unknown })
    const contextText = details.context ? ` | context: ${JSON.stringify(details.context)}` : ''
    const causeText = details.cause ? ` | cause: ${String(details.cause)}` : ''
    return new Error(`${error.message}${contextText}${causeText}`)
  }

  return new Error('Erro ao chamar função de usuários')
}

const invokeManageAuthUsersFallback = async <T>(
  action: ManageAuthUsersAction,
  payload?: Record<string, unknown>,
): Promise<T> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) {
    throw new Error(sessionError.message || 'Erro ao obter sessão para chamada de função')
  }

  const accessToken = sessionData.session?.access_token
  if (!accessToken) {
    throw new Error('Sessão inválida para chamar a função de usuários')
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/manage-auth-users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ action, ...payload }),
  })

  const data = (await response.json().catch(() => ({}))) as T & { error?: string }

  if (!response.ok) {
    throw new Error(data.error || `Erro HTTP ${response.status} ao chamar função de usuários`)
  }

  return data as T
}

const callManageAuthUsers = async <T>(
  action: ManageAuthUsersAction,
  payload?: Record<string, unknown>,
): Promise<T> => {
  const { data, error } = await supabase.functions.invoke('manage-auth-users', {
    body: { action, ...payload },
  })

  if (!error) {
    return data as T
  }

  const parsedError = formatInvokeError(error)

  if (parsedError.message.includes('Failed to send a request to the Edge Function')) {
    return invokeManageAuthUsersFallback<T>(action, payload)
  }

  throw parsedError
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
    const response = await callManageAuthUsers<{ users?: ManagedProfileUser[] }>('list')

    return response.users ?? []
  },

  create: async (input: CreateManagedAuthUserInput): Promise<ManagedProfileUser> => {
    const response = await callManageAuthUsers<{ user: ManagedProfileUser }>('create', {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      status: input.status ?? 'Ativo',
    })

    return response.user
  },

  updateProfile: async (input: UpdateManagedProfileInput): Promise<void> => {
    await callManageAuthUsers<{ user: ManagedProfileUser }>('update', {
      id: input.id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      status: input.status,
    })
  },

  resetPassword: async (input: { id?: string; email?: string | null }): Promise<boolean> => {
    const normalizedId = String(input.id || '').trim()
    const normalizedEmail = String(input.email || '').trim().toLowerCase()

    if (!normalizedId && !normalizedEmail) {
      throw new Error('Usuário sem identificador para redefinição de senha')
    }

    await callManageAuthUsers<{ success: boolean; email?: string }>('reset_password', {
      id: normalizedId || undefined,
      email: normalizedEmail || undefined,
      redirectTo: `${window.location.origin}/reset-password`,
    })

    return true
  },
}
