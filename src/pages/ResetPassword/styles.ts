import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at top left, #1e3a8a 0%, #0f172a 50%, #020617 100%);
  background-attachment: fixed;
  padding: 24px;
`

export const Card = styled.div`
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 48px;
  border-radius: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`

export const IconHeader = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
`

export const SuccessIcon = styled.div`
  margin-bottom: 8px;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

export const ErrorIcon = styled.div`
  margin-bottom: 8px;
  animation: shake 0.5s ease-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`

export const Loading = styled.div`
  font-size: 16px;
  color: #94a3b8;
  padding: 40px;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #f1f5f9;
  margin: 0;
  letter-spacing: -0.5px;
`

export const Subtitle = styled.p`
  font-size: 15px;
  color: #64748b;
  text-align: center;
  margin: 0;
  line-height: 1.6;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 8px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
  }

  input {
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 14px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }

    &::placeholder {
      color: #94a3b8;
    }
  }
`

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-left: 4px solid #ef4444;
`

export const PasswordRules = styled.div`
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  width: 100%;

  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
  }
`

interface RuleItemProps {
  valid: boolean
}

export const RuleItem = styled.div<RuleItemProps>`
  font-size: 13px;
  color: ${props => (props.valid ? '#10b981' : '#64748b')};
  font-weight: ${props => (props.valid ? 600 : 400)};
  margin: 6px 0;
  transition: all 0.2s;
`
