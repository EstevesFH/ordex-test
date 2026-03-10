import React, { useState, useEffect } from 'react'
import { FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase'
import { Button } from '@/components/Button'
import * as S from './styles'

const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [validToken, setValidToken] = useState<boolean | null>(null)

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const isStrongPassword = hasMinLength && hasUppercase && hasNumber && hasSpecial

  useEffect(() => {
    // Verificar se há um token de recuperação na URL
    checkRecoveryToken()
  }, [])

  const checkRecoveryToken = async () => {
    const { data } = await supabase.auth.getSession()
    
    if (data.session) {
      setValidToken(true)
    } else {
      setValidToken(false)
      setError('Link de recuperação inválido ou expirado')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validações
    if (!isStrongPassword) {
      setError('A senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 número e 1 caractere especial')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        throw updateError
      }

      setSuccess(true)

      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err: unknown) {
      console.error('Erro ao redefinir senha:', err)
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message?: string }).message || 'Erro ao redefinir senha')
      } else {
        setError('Erro ao redefinir senha')
      }
    } finally {
      setLoading(false)
    }
  }

  if (validToken === null) {
    return (
      <S.Container>
        <S.Card>
          <S.Loading>Verificando...</S.Loading>
        </S.Card>
      </S.Container>
    )
  }

  if (validToken === false) {
    return (
      <S.Container>
        <S.Card>
          <S.ErrorIcon>
            <FiAlertCircle size={64} color="#ef4444" />
          </S.ErrorIcon>
          <S.Title>Link Inválido</S.Title>
          <S.Subtitle>
            O link de recuperação é inválido ou já expirou.
            Por favor, solicite um novo link de recuperação.
          </S.Subtitle>
          <Button onClick={() => navigate('/forgot-password')} style={{ width: '100%' }}>
            Solicitar Novo Link
          </Button>
        </S.Card>
      </S.Container>
    )
  }

  if (success) {
    return (
      <S.Container>
        <S.Card>
          <S.SuccessIcon>
            <FiCheckCircle size={64} color="#10b981" />
          </S.SuccessIcon>
          <S.Title>Senha Redefinida!</S.Title>
          <S.Subtitle>
            Sua senha foi alterada com sucesso.
            Você será redirecionado para a página de login em breve.
          </S.Subtitle>
          <Button onClick={() => navigate('/login')} style={{ width: '100%' }}>
            Ir para Login
          </Button>
        </S.Card>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Card>
        <S.IconHeader>
          <FiLock size={48} color="#2f80ed" />
        </S.IconHeader>

        <S.Title>Redefinir Senha</S.Title>
        <S.Subtitle>
          Digite sua nova senha abaixo.
        </S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <label>Nova Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
placeholder="Mínimo 8 caracteres"
              autoFocus
            />
          </S.Field>

          <S.Field>
            <label>Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="Digite a senha novamente"
            />
          </S.Field>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.PasswordRules>
            <p><strong>Requisitos da senha:</strong></p>
            <S.RuleItem valid={hasMinLength}>
              {hasMinLength ? '✓' : '○'} Mínimo de 8 caracteres
            </S.RuleItem>
            <S.RuleItem valid={hasUppercase}>
              {hasUppercase ? '✓' : '○'} Pelo menos 1 letra maiúscula
            </S.RuleItem>
            <S.RuleItem valid={hasNumber}>
              {hasNumber ? '✓' : '○'} Pelo menos 1 número
            </S.RuleItem>
            <S.RuleItem valid={hasSpecial}>
              {hasSpecial ? '✓' : '○'} Pelo menos 1 caractere especial
            </S.RuleItem>
            <S.RuleItem valid={password === confirmPassword && password.length > 0}>
              {password === confirmPassword && password.length > 0 ? '✓' : '○'} Senhas coincidem
            </S.RuleItem>
          </S.PasswordRules>

          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Redefinindo...' : 'Redefinir Senha'}
          </Button>
        </S.Form>
      </S.Card>
    </S.Container>
  )
}

export { ResetPassword }
