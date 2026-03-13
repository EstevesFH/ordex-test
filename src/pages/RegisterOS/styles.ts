import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${ds.spacing.md};
  flex-wrap: wrap;
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.md};

  h1 {
    color: ${ds.colors.textMain};
    font-size: ${ds.typography.size.xxl};
    margin: 0;
  }
`

export const FormCard = styled.div`
  background: ${ds.colors.surface};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  width: 100%;
  border: 1px solid ${ds.colors.border};
  box-shadow: 0 12px 30px rgba(2, 6, 23, 0.08);

  h2 {
    font-size: ${ds.typography.size.lg};
    color: ${ds.colors.textMain};
    margin-bottom: ${ds.spacing.lg};
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${ds.spacing.md};
  margin-bottom: ${ds.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 14px;
    background: ${ds.colors.surface};
    border: 1px solid ${ds.colors.border};
    border-radius: ${ds.radius.md};
    font-size: ${ds.typography.size.base};
    color: ${ds.colors.textMain};
    outline: none;

    &:focus {
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`

export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${ds.spacing.lg};
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${ds.spacing.md};
`

export const ModalContent = styled.div`
  background: ${ds.colors.surface};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.xl};
  max-width: 440px;
  width: 100%;
  text-align: center;
  border: 1px solid ${ds.colors.border};

  h2 {
    color: #047857;
    font-size: ${ds.typography.size.xl};
    margin-bottom: ${ds.spacing.md};
  }

  p {
    color: ${ds.colors.textSecondary};
    line-height: 1.5;
    margin-bottom: ${ds.spacing.md};
  }
`

export const ProtocolBadge = styled.div`
  background: ${ds.colors.background};
  padding: 12px;
  border-radius: ${ds.radius.md};
  font-size: ${ds.typography.size.lg};
  font-weight: ${ds.typography.weight.bold};
  color: ${ds.colors.textMain};
  margin-bottom: ${ds.spacing.md};
  border: 1px dashed ${ds.colors.border};
`

export const LoaderWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`