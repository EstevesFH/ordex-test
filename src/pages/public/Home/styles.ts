import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const FullPageContainer = styled.div`
  min-height: 100vh;
  background: ${ds.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ds.spacing.xl};
  font-family: ${ds.typography.fontFamily};
`

export const MainContent = styled.main`
  width: 100%;
  max-width: 760px;
`

export const BrandCard = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  box-shadow: 0 12px 28px rgba(2, 6, 23, 0.06);
  padding: ${ds.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${ds.spacing.md};
`

export const Subtitle = styled.p`
  margin: 0;
  color: ${ds.colors.textSecondary};
  font-size: ${ds.typography.size.base};
  text-align: center;
`

export const ButtonGroup = styled.div`
  width: 100%;
  margin-top: ${ds.spacing.md};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${ds.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
