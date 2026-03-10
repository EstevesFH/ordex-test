import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${ds.spacing.lg};
  padding-bottom: ${ds.spacing.md};
  border-bottom: 1px solid ${ds.colors.border};

  h2 {
    font-size: ${ds.typography.size.xl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
`

export const ItemName = styled.p`
  font-size: ${ds.typography.size.sm};
  color: ${ds.colors.textSecondary};
  margin: 4px 0 0 0;
`

export const CloseButton = styled.button`
  background: transparent;
  border: 1px solid ${ds.colors.border};
  color: ${ds.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  border-radius: ${ds.radius.md};

  &:hover {
    background: ${ds.colors.surfaceHover};
    color: ${ds.colors.textMain};
  }
`

export const CurrentStock = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  margin-bottom: ${ds.spacing.lg};
  text-align: center;
`

export const StockLabel = styled.div`
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  color: ${ds.colors.textSecondary};
  margin-bottom: 8px;
`

export const StockValue = styled.div<{ critical: boolean }>`
  font-size: 28px;
  font-weight: ${ds.typography.weight.bold};
  color: ${({ critical }) => (critical ? '#b91c1c' : ds.colors.textMain)};
  margin-bottom: 8px;
`

export const CriticalBadge = styled.div`
  display: inline-block;
  background: #fffbeb;
  color: #b45309;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  border: 1px solid #fde68a;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

export const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${ds.spacing.sm};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const getTypeButtonColor = (color: string, active: boolean) => {
  if (!active) return { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b' }

  if (color === 'green') return { bg: '#ecfdf5', border: '#86efac', text: '#047857' }
  if (color === 'red') return { bg: '#fef2f2', border: '#fecaca', text: '#b91c1c' }
  return { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' }
}

export const TypeButton = styled.button<{ active: boolean; color: 'green' | 'red' | 'blue' }>`
  background: ${p => getTypeButtonColor(p.color, p.active).bg};
  border: 1px solid ${p => getTypeButtonColor(p.color, p.active).border};
  color: ${p => getTypeButtonColor(p.color, p.active).text};
  padding: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;

  strong {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
  }

  span {
    font-size: 11px;
  }

  &:hover {
    filter: brightness(0.98);
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
  }

  input,
  textarea {
    padding: 12px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.base};
    color: ${ds.colors.textMain};

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`

export const Preview = styled.div`
  background: #eff6ff;
  padding: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  border: 1px solid #bfdbfe;
`

export const PreviewLabel = styled.div`
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  color: ${ds.colors.textSecondary};
  margin-bottom: 6px;
`

export const PreviewValue = styled.div<{ critical: boolean }>`
  font-size: ${ds.typography.size.xl};
  font-weight: ${ds.typography.weight.bold};
  color: ${({ critical }) => (critical ? '#b91c1c' : ds.colors.textMain)};
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.sm};
  padding-top: ${ds.spacing.md};
  border-top: 1px solid ${ds.colors.border};
`
