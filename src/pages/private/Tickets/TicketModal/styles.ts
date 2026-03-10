import styled from 'styled-components'
import { designSystem as ds } from '../../../../styles/designSystem'

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
  max-width: 760px;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.2);
  max-height: 90vh;
  overflow-y: auto;
`

export const Title = styled.h2`
  font-size: ${ds.typography.size.xl};
  font-weight: ${ds.typography.weight.bold};
  color: ${ds.colors.textMain};
  margin-bottom: ${ds.spacing.lg};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${ds.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div<{ full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ full }) => (full ? '1 / -1' : 'auto')};

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
  }

  input,
  textarea,
  select {
    padding: 10px 14px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.base};
    background: ${ds.colors.surface};
    color: ${ds.colors.textMain};
    resize: vertical;

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }

  input:disabled,
  textarea:disabled {
    background: #f8fafc;
    color: ${ds.colors.textSecondary};
    cursor: not-allowed;
  }
`

export const Actions = styled.div`
  margin-top: ${ds.spacing.lg};
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.sm};
`
