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

export const TableWrapper = styled.div`
  max-height: 420px;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 10px 8px;
    border-bottom: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.sm};
  }

  th {
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
    background: ${ds.colors.surface};
    position: sticky;
    top: 0;
  }

  td {
    color: ${ds.colors.textMain};
  }
`

export const InlineInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const TypeBadge = styled.span<{ $type: 'in' | 'out' | 'adjustment' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};

  ${({ $type }) => {
    if ($type === 'in') {
      return `
        background: #ecfdf5;
        color: #047857;
        border: 1px solid #86efac;
      `
    }

    if ($type === 'out') {
      return `
        background: #fef2f2;
        color: #b91c1c;
        border: 1px solid #fecaca;
      `
    }

    return `
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
    `
  }}
`

export const StateMessage = styled.div`
  padding: ${ds.spacing.lg} 0;
  text-align: center;
  color: ${ds.colors.textSecondary};
`

export const ErrorMessage = styled(StateMessage)`
  color: #b91c1c;
`
