import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ds.spacing.lg};
  background: ${ds.colors.background};
`

export const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${ds.colors.backgroundCard};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.xl};
  padding: ${ds.spacing.xl};
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${ds.spacing.md};
`

export const IconHeader = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: ${ds.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SuccessIcon = styled.div`
  margin-bottom: ${ds.spacing.xs};
`

export const Title = styled.h1`
  margin: 0;
  font-size: ${ds.typography.size.xl};
  font-weight: ${ds.typography.weight.bold};
  color: ${ds.colors.textMain};
  text-align: center;
`

export const Subtitle = styled.p`
  margin: 0;
  text-align: center;
  color: ${ds.colors.textSecondary};
  line-height: 1.6;

  strong {
    color: ${ds.colors.textMain};
  }
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textMain};
  }

  input {
    width: 100%;
    border: 1px solid ${ds.colors.border};
    background: ${ds.colors.surface};
    border-radius: ${ds.radius.md};
    padding: 12px;
    color: ${ds.colors.textMain};

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  }
`

export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: ${ds.spacing.sm};
  border-radius: ${ds.radius.md};
  font-size: ${ds.typography.size.sm};
`

export const InfoBox = styled.div`
  width: 100%;
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.md};
  padding: ${ds.spacing.md};

  p {
    margin: 0 0 ${ds.spacing.xs};
    color: ${ds.colors.textMain};
  }

  ul {
    margin: 0;
    padding-left: ${ds.spacing.lg};
    color: ${ds.colors.textSecondary};
  }
`

export const BackLink = styled.button`
  border: none;
  background: transparent;
  color: ${ds.colors.primary};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`
