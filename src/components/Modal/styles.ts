import styled, { keyframes } from 'styled-components'
import { designSystem as ds } from '../../styles/designSystem'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease;
  padding: ${ds.spacing.md};
`

export const Modal = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  padding: ${ds.spacing.xl};
  border-radius: ${ds.radius.lg};
  width: 100%;
  max-width: 560px;
  text-align: center;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.2);
  animation: ${scaleIn} 0.2s ease;
`

export const Title = styled.h2`
  font-size: ${ds.typography.size.xl};
  font-weight: ${ds.typography.weight.bold};
  margin-bottom: ${ds.spacing.sm};
  color: ${ds.colors.textMain};
`

export const Message = styled.p`
  font-size: ${ds.typography.size.base};
  color: ${ds.colors.textSecondary};
  line-height: 1.6;

  strong {
    color: ${ds.colors.textMain};
    font-weight: ${ds.typography.weight.semibold};
  }
`

export const Actions = styled.div`
  margin-top: ${ds.spacing.lg};
  display: flex;
  gap: ${ds.spacing.sm};
  justify-content: center;

  button {
    padding: 10px 18px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.primary};
    background: ${ds.colors.primary};
    color: ${ds.colors.white};
    font-weight: ${ds.typography.weight.semibold};
    cursor: pointer;

    &:hover {
      background: ${ds.colors.primaryHover};
    }
  }
`
