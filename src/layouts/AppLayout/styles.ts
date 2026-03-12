import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${ds.colors.background};
`

export const MainContent = styled.main`
  min-height: 100vh;
  margin-left: var(--sidebar-width, 80px);
  transition: margin-left ${ds.transitions.base};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

export const ContentArea = styled.div`
  padding: ${ds.spacing.xxl};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${ds.spacing.lg};
  }
`