import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ds.spacing.lg};
  background: ${ds.colors.background};
`

export const LoginCard = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  padding: ${ds.spacing.xl};
  border-radius: ${ds.radius.lg};
  width: 100%;
  max-width: 420px;
  box-shadow: 0 16px 40px rgba(2, 6, 23, 0.08);
`

export const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${ds.spacing.lg};

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: ${ds.colors.primaryPale};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: ${ds.colors.primary};
    border: 1px solid #bfdbfe;
  }

  h1 {
    font-size: ${ds.typography.size.xl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0 0 4px;
  }

  p {
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.textSecondary};
    margin: 0;
  }
`

export const InputGroup = styled.div`
  margin-bottom: ${ds.spacing.md};

  label {
    display: block;
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
    margin-bottom: 8px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 14px;
      color: ${ds.colors.textSecondary};
    }

    input {
      width: 100%;
      padding: 12px 12px 12px 42px;
      font-size: ${ds.typography.size.base};
      border: 1px solid ${ds.colors.border};
      border-radius: ${ds.radius.md};
      background: ${ds.colors.surface};
      color: ${ds.colors.textMain};
      outline: none;

      &:focus {
        border-color: ${ds.colors.primaryLight};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }

      &::placeholder {
        color: #94a3b8;
      }
    }
  }
`

export const ErrorAlert = styled.div`
  padding: 12px;
  margin-bottom: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: ${ds.typography.size.sm};
  text-align: center;
`

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: ${ds.spacing.md};
`

export const ForgotLink = styled.div`
  text-align: right;
  margin-bottom: ${ds.spacing.md};

  a {
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.primary};
    text-decoration: none;
    font-weight: ${ds.typography.weight.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`
