import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { supabase } from '../../../services/supabase'
import Iridescence from '../../../components/ReactBits/Iridescence'
import Button from '../../../components/Button'
import * as S from './styles'

type AppRole = 'Administrador' | 'Operador'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) return

    const user = JSON.parse(userStr)
    const now = Date.now()
    const fifteenMinutes = 15 * 60 * 1000

    if (now - (user.lastActive || now) < fifteenMinutes) {
      navigate(user.role === 'Operador' ? '/tickets' : '/dashboard', { replace: true })
    }
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

      const role = ((signInData.user.app_metadata?.role as string) || 'Operador') as AppRole
      const status = ((signInData.user.app_metadata?.status as string) || 'Ativo').toLowerCase()
      const displayName =
        (signInData.user.user_metadata?.name as string) ||
        (signInData.user.email?.split('@')[0] as string) ||
        'Usuário'

      if (status !== 'ativo') {
        await supabase.auth.signOut()
        setError('Usuário inativo. Contate o administrador.')
        return
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: signInData.user.id,
          username: signInData.user.email,
          name: displayName,
          role,
          lastActive: Date.now(),
        }),
      )

      navigate(role === 'Operador' ? '/tickets' : '/dashboard', { replace: true })
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
