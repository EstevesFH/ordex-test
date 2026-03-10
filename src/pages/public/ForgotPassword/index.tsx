import React, { useState } from 'react'
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../services/supabase'
import { Button } from '../../../components/Button'
import * as S from './styles'

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) {
        throw resetError
      }

      setSuccess(true)
    } catch (err: unknown) {
      console.error('Erro ao enviar e-mail de recuperação:', err)
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message?: string }).message || 'Erro ao enviar e-mail de recuperação')
      } else {
        setError('Erro ao enviar e-mail de recuperação')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => navigate('/login')

  if (success) {
    return (
      <S.Container>
        <S.Card>
          <S.SuccessIcon>
            <FiCheckCircle size={60} color="#10b981" />
          </S.SuccessIcon>

          <S.Title>E-mail enviado</S.Title>
          <S.Subtitle>
            Enviamos um link de recuperação para <strong>{email}</strong>.
            Verifique sua caixa de entrada para criar/redefinir sua senha.
          </S.Subtitle>

          <S.InfoBox>
            <p><strong>Não recebeu o e-mail?</strong></p>
            <ul>
              <li>Verifique sua caixa de spam.</li>
              <li>Confirme se o e-mail informado está correto.</li>
              <li>Aguarde alguns minutos e tente novamente.</li>
            </ul>
          </S.InfoBox>

          <Button onClick={handleBackToLogin} style={{ width: '100%' }}>
            <FiArrowLeft size={16} />
            Voltar para Login
          </Button>
        </S.Card>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Card>
        <S.IconHeader>
          <FiMail size={32} color="#ffffff" />
        </S.IconHeader>

        <S.Title>Esqueci minha senha</S.Title>
        <S.Subtitle>
          Digite seu e-mail para receber um link de redefinição de senha.
        </S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              autoFocus
            />
          </S.Field>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Enviando...' : 'Enviar link de redefinição'}
          </Button>
        </S.Form>

        <S.BackLink onClick={handleBackToLogin}>
          <FiArrowLeft size={16} />
          Voltar para login
        </S.BackLink>
      </S.Card>
    </S.Container>
  )
}

export { ForgotPassword }
