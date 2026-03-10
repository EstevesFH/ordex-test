import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${ds.spacing.lg};
  gap: ${ds.spacing.md};
  flex-wrap: wrap;

  h1 {
    font-size: ${ds.typography.size.xxl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
`

export const Alert = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-left: 4px solid #f59e0b;
  padding: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  margin-bottom: ${ds.spacing.md};
  display: flex;
  align-items: center;
  gap: ${ds.spacing.md};

  strong {
    color: #92400e;
    display: block;
  }

  p {
    margin: 4px 0 0;
    color: #b45309;
    font-size: ${ds.typography.size.sm};
  }
`

export const AlertIcon = styled.div`
  color: #d97706;
  display: flex;
`

export const Controls = styled.div`
  display: flex;
  gap: ${ds.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${ds.spacing.md};
`

export const LowStockBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  padding: 8px 12px;
  border-radius: ${ds.radius.md};
  font-size: ${ds.typography.size.sm};
  font-weight: ${ds.typography.weight.semibold};
`

export const TableCard = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  padding: ${ds.spacing.lg};
  border-radius: ${ds.radius.lg};
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
`

export const TableHeader = styled.div`
  margin-bottom: ${ds.spacing.md};

  h2 {
    margin: 0;
    font-size: ${ds.typography.size.lg};
    color: ${ds.colors.textMain};
  }
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: ${ds.spacing.xl} ${ds.spacing.md};
  color: ${ds.colors.textSecondary};
`

export const TableWrapper = styled.div`
  max-height: 520px;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.textSecondary};
    font-weight: ${ds.typography.weight.semibold};
    padding: 10px 8px;
    position: sticky;
    top: 0;
    background: ${ds.colors.surface};
  }

  td {
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.textMain};
    padding: 12px 8px;
    border-top: 1px solid ${ds.colors.border};
  }
`

export const QuantityCell = styled.div<{ critical: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${({ critical }) => (critical ? 700 : 500)};
  color: ${({ critical }) => (critical ? '#b91c1c' : ds.colors.textMain)};

  svg {
    color: #d97706;
  }
`

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponível':
      return { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' }
    case 'Reservado':
      return { bg: '#fffbeb', color: '#b45309', border: '#fde68a' }
    case 'Indisponível':
      return { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' }
    default:
      return { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' }
  }
}

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  background: ${({ status }) => getStatusColor(status).bg};
  color: ${({ status }) => getStatusColor(status).color};
  border: 1px solid ${({ status }) => getStatusColor(status).border};
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button`
  border: 1px solid ${ds.colors.border};
  background: ${ds.colors.surface};
  color: ${ds.colors.textSecondary};
  cursor: pointer;
  padding: 6px;
  border-radius: ${ds.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${ds.colors.primary};
    border-color: ${ds.colors.primaryLight};
  }
`
