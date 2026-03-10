import styled from 'styled-components'
import { designSystem as ds } from '../../../../../styles/designSystem'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${ds.spacing.md};
`

export const Modal = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  padding: ${ds.spacing.xl};
  border-radius: ${ds.radius.lg};
  width: 100%;
  max-width: 540px;
  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.2);
`

export const Title = styled.h2`
  font-size: ${ds.typography.size.xl};
  font-weight: ${ds.typography.weight.bold};
  color: ${ds.colors.textMain};
  margin: 0 0 ${ds.spacing.lg};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: ${ds.spacing.md};

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
  }

  input,
  select {
    padding: 10px 14px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.base};
    background: ${ds.colors.surface};
    color: ${ds.colors.textMain};

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }

  select {
    cursor: pointer;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.sm};
  margin-top: ${ds.spacing.lg};
`
