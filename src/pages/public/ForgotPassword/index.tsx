import React, { useState } from 'react'
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../services/supabase'

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

  const handleBackToLogin = () => {
    navigate('/login')
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        padding: '24px'
      }}>
        <div style={{
          background: '#1e293b',
          padding: '48px',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <FiCheckCircle size={64} color="#10b981" />
          </div>

          <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '16px' }}>
            E-mail Enviado!
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            Enviamos um link de recuperação de senha para <strong>{email}</strong>.
            Verifique sua caixa de entrada e siga as instruções.
          </p>

          <div style={{
            background: '#334155',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <p style={{ color: 'white', fontWeight: '600', marginBottom: '8px' }}>
              Não recebeu o e-mail?
            </p>
            <ul style={{ color: '#94a3b8', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Verifique sua caixa de spam</li>
              <li>Confirme se o e-mail está correto</li>
              <li>Aguarde alguns minutos e tente novamente</li>
            </ul>
          </div>

          <button
            onClick={handleBackToLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <FiArrowLeft size={18} />
            Voltar para Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      padding: '24px'
    }}>
      <div style={{
        background: '#1e293b',
        padding: '48px',
        borderRadius: '16px',
        maxWidth: '440px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <FiMail size={48} color="#3b82f6" />
        </div>

        <h1 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginBottom: '8px' }}>
          Esqueceu sua senha?
        </h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px' }}>
          Digite seu e-mail e enviaremos instruções para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#f1f5f9',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                background: '#334155',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: 'white',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#fca5a5',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#6b7280' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div
          onClick={handleBackToLogin}
          style={{
            marginTop: '24px',
            textAlign: 'center',
            color: '#3b82f6',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px'
          }}
        >
          <FiArrowLeft size={16} />
          Voltar para o login
        </div>
      </div>
    </div>
  )
}

export { ForgotPassword }
