import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 1.1fr) minmax(380px, 0.9fr);
  background: linear-gradient(
    135deg,
    ${ds.colors.background} 0%,
    #eef4ff 45%,
    #f8fafc 100%
  );

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const BrandSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ds.spacing.xxl};
  overflow: hidden;

  @media (max-width: 980px) {
    min-height: 42vh;
    padding: ${ds.spacing.xl} ${ds.spacing.lg};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.18), transparent 30%),
      radial-gradient(circle at 80% 30%, rgba(30, 58, 138, 0.12), transparent 35%),
      radial-gradient(circle at 60% 80%, rgba(34, 211, 238, 0.12), transparent 28%);
    pointer-events: none;
  }
`

export const BrandContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(30, 58, 138, 0.1);
    color: ${ds.colors.primary};
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    backdrop-filter: blur(10px);
    margin-bottom: ${ds.spacing.lg};
  }

  .logo {
    display: block;
    width: min(100%, 320px);
    height: auto;
    margin-bottom: ${ds.spacing.xl};

    @media (max-width: 980px) {
      width: min(100%, 240px);
    }
  }

  h1 {
    margin: 0 0 16px;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    color: ${ds.colors.textMain};
    font-weight: ${ds.typography.weight.bold};
  }

  p {
    margin: 0;
    max-width: 540px;
    font-size: ${ds.typography.size.lg};
    line-height: 1.7;
    color: ${ds.colors.textSecondary};
  }
`

export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 14px;
  margin-top: ${ds.spacing.xl};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 18px;
  padding: 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(2, 6, 23, 0.05);

  strong {
    display: block;
    margin-bottom: 6px;
    font-size: ${ds.typography.size.base};
    color: ${ds.colors.textMain};
    font-weight: ${ds.typography.weight.semibold};
  }

  span {
    font-size: ${ds.typography.size.sm};
    line-height: 1.6;
    color: ${ds.colors.textSecondary};
  }
`

export const LoginSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ds.spacing.xl};
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(6px);

  @media (max-width: 980px) {
    padding: 0 ${ds.spacing.lg} ${ds.spacing.xl};
    background: transparent;
  }
`

export const LoginCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${ds.colors.surface};
  border: 1px solid rgba(229, 231, 235, 0.9);
  padding: ${ds.spacing.lg};
  border-radius: 24px;
  box-shadow:
    0 24px 60px rgba(2, 6, 23, 0.08),
    0 8px 24px rgba(2, 6, 23, 0.04);

  @media (max-width: 560px) {
    padding: ${ds.spacing.lg};
    border-radius: 20px;
  }
`

export const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${ds.spacing.lg};

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: linear-gradient(135deg, ${ds.colors.primaryPale} 0%, #eff6ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    color: ${ds.colors.primary};
    border: 1px solid #bfdbfe;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  h1 {
    font-size: ${ds.typography.size.xxl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.textSecondary};
    margin: 0;
    line-height: 1.6;
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
      transition: color ${ds.transitions.fast};
    }

    input {
      width: 100%;
      height: 50px;
      padding: 12px 14px 12px 42px;
      font-size: ${ds.typography.size.base};
      border: 1px solid ${ds.colors.border};
      border-radius: 14px;
      background: ${ds.colors.surface};
      color: ${ds.colors.textMain};
      outline: none;
      transition:
        border-color ${ds.transitions.fast},
        box-shadow ${ds.transitions.fast},
        background ${ds.transitions.fast};

      &:hover {
        background: ${ds.colors.surfaceHover};
      }

      &:focus {
        border-color: ${ds.colors.primaryLight};
        box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.16);
      }

      &::placeholder {
        color: #94a3b8;
      }
    }

    &:focus-within svg {
      color: ${ds.colors.primary};
    }
  }
`

export const ErrorAlert = styled.div`
  padding: 12px 14px;
  margin-bottom: ${ds.spacing.md};
  border-radius: 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: ${ds.typography.size.sm};
  text-align: center;
`

export const ForgotLink = styled.div`
  text-align: right;
  margin-bottom: ${ds.spacing.md};

  a {
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.primary};
    text-decoration: none;
    font-weight: ${ds.typography.weight.medium};
    transition: opacity ${ds.transitions.fast};

    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }
`

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: ${ds.spacing.md};
`

export const FooterNote = styled.div`
  margin-top: ${ds.spacing.lg};
  padding-top: ${ds.spacing.md};
  border-top: 1px solid ${ds.colors.border};
  text-align: center;
  font-size: ${ds.typography.size.sm};
  color: ${ds.colors.textSecondary};
`