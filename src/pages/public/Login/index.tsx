import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { supabase } from '../../../services/supabase'
import Iridescence from '../../../components/ReactBits/Iridescence'
import Button from '../../../components/Button'
import * as S from './styles'

const Login = () => {
  const [login, setLogin] = useState('')
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
      navigate('/dashboard')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: supabaseError } = await supabase
        .from('accesses')
        .select('*')
        .eq('username', login)
        .eq('password', password)
        .ilike('status', 'ativo')
        .single()

      if (supabaseError || !data) {
        setError('Usuário ou senha inválidos.')
        return
      }

      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        username: data.username,
        name: data.name,
        role: data.role,
        lastActive: Date.now()
      }))

      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Erro ao autenticar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <Iridescence 
        color={[0.12, 0.24, 0.45]}
        speed={0.3}                
        amplitude={0.15}           
        mouseReact={false}
      />

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
            <label>Usuário</label>
            <div className="input-wrapper">
              <FiMail size={18} />
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="nome.usuario"
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
                onChange={(e) => setPassword(e.target.value)}
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
            <Button 
              primary 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Entrar'}
            </Button>
            
            <Button 
              type="button" 
              onClick={() => navigate('/')}
            >
              Voltar
            </Button>
          </S.ActionWrapper>
        </form>
      </S.LoginCard>
    </S.Container>
  )
}

export { Login }