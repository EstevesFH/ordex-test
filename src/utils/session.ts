export type AppRole = 'Administrador' | 'Supervisor' | 'Operador'

export interface SessionUser {
  id: string
  username: string
  name: string
  role: AppRole | string
  lastActive: number
}

const roleMap: Record<string, AppRole> = {
  administrador: 'Administrador',
  admin: 'Administrador',
  administrator: 'Administrador',
  supervisor: 'Supervisor',
  operador: 'Operador',
  operator: 'Operador',
}

export const normalizeRole = (role?: string | null): AppRole => {
  if (!role) return 'Operador'
  const normalized = roleMap[role.trim().toLowerCase()]
  return normalized || 'Operador'
}

export const getSessionUser = (): SessionUser | null => {
  const raw = localStorage.getItem('user')
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as SessionUser
    return {
      ...parsed,
      role: normalizeRole(parsed.role),
    }
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

export const getLandingByRole = (role: string) => (normalizeRole(role) === 'Operador' ? '/tickets' : '/dashboard')

export const isSupervisor = (role?: string) => normalizeRole(role) === 'Supervisor'
