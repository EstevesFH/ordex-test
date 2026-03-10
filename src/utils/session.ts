export type AppRole = 'Administrador' | 'Supervisor' | 'Operador'

export interface SessionUser {
  id: string
  username: string
  name: string
  role: AppRole | string
  lastActive: number
}

export const getSessionUser = (): SessionUser | null => {
  const raw = localStorage.getItem('user')
  if (!raw) return null

  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

export const getLandingByRole = (role: string) => (role === 'Operador' ? '/tickets' : '/dashboard')

export const isSupervisor = (role?: string) => role === 'Supervisor'
