import { supabase } from './supabase'

type UserStatus = 'Ativo' | 'Inativo'

export interface ManagedProfileUser {
  id: string
  name: string
  email: string | null
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
      throw new Error(error.message || 'Erro ao carregar usuários')
    }

    return (data ?? []) as ManagedProfileUser[]
  },

  create: async (input: CreateManagedAuthUserInput): Promise<ManagedProfileUser> => {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        role: input.role,
        status: input.status ?? 'Ativo',
      })
      .select('id, name, email, role, status, created_at')
      .single()

    if (error) {
      throw new Error(error.message || 'Erro ao criar usuário')
    }

    return data as ManagedProfileUser
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
      throw new Error(error.message || 'Erro ao atualizar usuário')
    }
  },

  resetPassword: async (input: { email?: string | null }): Promise<boolean> => {
    const normalizedEmail = String(input.email || '').trim().toLowerCase()

    if (!normalizedEmail) {
      throw new Error('Usuário sem e-mail válido para redefinição de senha')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      throw new Error(error.message || 'Erro ao enviar redefinição de senha')
    }

    return true
  },
}
