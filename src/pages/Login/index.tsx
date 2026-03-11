import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { getLandingByRole, type AppRole } from '@/utils/session'
import Button from '@/components/Button'
import * as S from './styles'

const FIFTEEN_MINUTES = 15 * 60 * 1000

type StoredUser = {
  id: string
  username: string | null
  name: string
  role: AppRole
  lastActive: number
}

type ProfileData = {
  name: string | null
  role: string | null
  status?: string | null
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const authUser = sessionData.session?.user

        if (!authUser) return

        const savedUser = localStorage.getItem('user')
        let parsedUser: StoredUser | null = null

        if (savedUser) {
          try {
            parsedUser = JSON.parse(savedUser) as StoredUser
          } catch {
            localStorage.removeItem('user')
          }
        }

        const currentTime = Date.now()

        if (
          parsedUser?.id === authUser.id &&
          currentTime - parsedUser.lastActive < FIFTEEN_MINUTES
        ) {
          navigate(getLandingByRole(parsedUser.role), { replace: true })
          return
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name, role, status')
          .eq('id', authUser.id)
          .maybeSingle<ProfileData>()

        if (profileError) {
          console.error('Erro ao buscar perfil:', profileError)
          return
        }

        const role = (profileData?.role || 'Operador') as AppRole
        const status = (profileData?.status || 'Ativo').toLowerCase()
        const displayName =
          profileData?.name ||
          (authUser.user_metadata?.name as string) ||
          authUser.email?.split('@')[0] ||
          'Usuário'

        if (status !== 'ativo') {
          await supabase.auth.signOut()
          localStorage.removeItem('user')
          return
        }

        localStorage.setItem(
          'user',
          JSON.stringify({
            id: authUser.id,
            username: authUser.email ?? null,
            name: displayName,
            role,
            lastActive: Date.now(),
          } satisfies StoredUser),
        )

        navigate(getLandingByRole(role), { replace: true })
      } catch (err) {
        console.error('Erro ao restaurar sessão:', err)
      }
    }

    restoreSession()
  }, [navigate])

  const handleSubmit = async (e: React.SyntheticEvent) => {
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

      const currentUser = signInData.user

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, role, status')
        .eq('id', currentUser.id)
        .maybeSingle<ProfileData>()

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError)
        setError('Não foi possível carregar o perfil do usuário.')
        return
      }

      const role = (profileData?.role || 'Operador') as AppRole
      const status = (profileData?.status || 'Ativo').toLowerCase()
      const displayName =
        profileData?.name ||
        (currentUser.user_metadata?.name as string) ||
        currentUser.email?.split('@')[0] ||
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
          username: currentUser.email ?? null,
          name: displayName,
          role,
          lastActive: Date.now(),
        } satisfies StoredUser),
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
          <img
            src="/logo.svg"
            alt="ORDEX Logo"
            width={120}
            style={{
              filter: "brightness(0) saturate(100%) invert(25%) sepia(78%) saturate(1350%) hue-rotate(220deg)"
            }}
          />
          <div className="icon-box">
            <FiLock size={30} />
          </div>
          <h1>Painel de Gestão</h1>
          <p>Entre com suas credenciais</p>
        </S.LogoWrapper>

        <form onSubmit={handleSubmit}>
          <S.InputGroup>
            <label htmlFor="login-email">E-mail</label>
            <div className="input-wrapper">
              <FiMail size={18} />
              <input
                id="login-email"
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@empresa.com"
                required
              />
            </div>
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="login-password">Senha</label>
            <div className="input-wrapper">
              <FiLock size={18} />
              <input
                id="login-password"
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