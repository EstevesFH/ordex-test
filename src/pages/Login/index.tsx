import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { getLandingByRole, normalizeRole, type AppRole } from '@/utils/session'
import Button from '@/components/Button'
import * as S from './styles'

type ProfileData = {
  name?: string | null
  role?: string | null
  status?: string | null
}

const getStoredUserRole = (userId: string) => {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    const parsed = JSON.parse(raw) as { id?: string; role?: string }
    if (parsed?.id !== userId) return null
    return parsed?.role || null
  } catch {
    return null
  }
}

const getProfileData = async (userId: string, email?: string | null): Promise<ProfileData | null> => {
  const byId = await supabase
    .from('profiles')
    .select('name, role, status')
    .eq('id', userId)
    .maybeSingle()

  if (!byId.error && byId.data) return byId.data as ProfileData

  if (email) {
    const byEmail = await supabase
      .from('profiles')
      .select('name, role, status')
      .eq('email', email)
      .maybeSingle()

    if (!byEmail.error && byEmail.data) return byEmail.data as ProfileData
  }

  return null
}

const getResolvedRole = (
  profileData: ProfileData | null,
  authUser: { app_metadata?: { role?: string }; user_metadata?: { role?: string }; id: string },
) => {
  const rawRole =
    profileData?.role ||
    authUser.app_metadata?.role ||
    authUser.user_metadata?.role ||
    getStoredUserRole(authUser.id) ||
    'Operador'

  return normalizeRole(rawRole) as AppRole
}

const getResolvedStatus = (profileData: ProfileData | null, authUser: { app_metadata?: { status?: string } }) =>
  ((profileData?.status as string) || (authUser.app_metadata?.status as string) || 'Ativo').toLowerCase()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const restoreSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (!user) return

      const profileData = await getProfileData(user.id, user.email)

      const role = getResolvedRole(profileData, user)
      const status = getResolvedStatus(profileData, user)

      if (status !== 'ativo') {
        await supabase.auth.signOut()
        localStorage.removeItem('user')
        return
      }

      const displayName =
        (profileData?.name as string) ||
        (user.user_metadata?.name as string) ||
        (user.email?.split('@')[0] as string) ||
        'Usuário'

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.email,
          name: displayName,
          role,
          lastActive: Date.now(),
        }),
      )

      navigate(getLandingByRole(role), { replace: true })
    }

    restoreSession()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: signInData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError || !signInData.user) {
        setError('E-mail ou senha inválidos.')
        return
      }

      const { data: currentUserData } = await supabase.auth.getUser()
      const currentUser = currentUserData.user || signInData.user

      const profileData = await getProfileData(currentUser.id, currentUser.email)

      const role = getResolvedRole(profileData, currentUser)
      const status = getResolvedStatus(profileData, currentUser)
      const displayName =
        (profileData?.name as string) ||
        (currentUser.user_metadata?.name as string) ||
        (currentUser.email?.split('@')[0] as string) ||
        'Usuário'

      if (status !== 'ativo') {
        await supabase.auth.signOut()
        setError('Usuário inativo. Contate o administrador.')
        return
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: currentUser.id,
          username: currentUser.email,
          name: displayName,
          role,
          lastActive: Date.now(),
        }),
      )

      navigate(getLandingByRole(role), { replace: true })
    } catch (err) {
      console.error(err)
      setError('Erro ao autenticar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.LoginCard>
        <S.LogoWrapper>
          <div className="icon-box">
            <FiLock size={30} />
          </div>
          <h1>Painel de Gestão</h1>
          <p>Entre com suas credenciais</p>
        </S.LogoWrapper>

        <form onSubmit={handleSubmit}>
          <S.InputGroup>
            <label>E-mail</label>
            <div className="input-wrapper">
              <FiMail size={18} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@empresa.com"
                required
              />
            </div>
          </S.InputGroup>

          <S.InputGroup>
            <label>Senha</label>
            <div className="input-wrapper">
              <FiLock size={18} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </S.InputGroup>

          {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

          <S.ForgotLink>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </S.ForgotLink>

          <S.ActionWrapper>
            <Button primary type="submit" disabled={loading}>
              {loading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </S.ActionWrapper>
        </form>
      </S.LoginCard>
    </S.Container>
  )
}

export { Login }
