import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: calc(100vh - 64px);
  gap: ${ds.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const Content = styled.main`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
`
