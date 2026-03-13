import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.xl};
`

export const LoaderWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${ds.spacing.md};
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.md};
`

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.md};

  strong {
    color: #b45309;
    display: block;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
    color: ${ds.colors.textSecondary};
    font-size: 14px;
  }
`

export const AlertIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TableCard = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  box-shadow: 0 2px 10px rgba(2, 6, 23, 0.05);
`

export const TableHeader = styled.div`
  margin-bottom: ${ds.spacing.md};

  h2 {
    margin: 0;
    font-size: 18px;
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

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 13px;
    color: ${ds.colors.textSecondary};
    font-weight: 600;
    padding: 10px 8px;
    position: sticky;
    top: 0;
    background: ${ds.colors.surface};
    z-index: 1;
  }

  td {
    font-size: 14px;
    color: ${ds.colors.textMain};
    padding: 16px 8px;
    border-top: 1px solid ${ds.colors.border};

    strong {
      color: ${ds.colors.textMain};
      font-weight: 600;
    }
  }

  tbody tr {
    transition: background 0.2s;

    &:hover {
      background: #f8fafc;
    }
  }
`

export const QuantityCell = styled.div<{ $critical: boolean }>`
  font-weight: ${({ $critical }) => ($critical ? 700 : 500)};
  color: ${({ $critical }) => ($critical ? '#b91c1c' : ds.colors.textMain)};
`

const getStatusBackground = (status: string) => {
  if (status === 'Disponível') return '#ecfdf5'
  if (status === 'Reservado') return '#fffbeb'
  if (status === 'Indisponível') return '#fef2f2'
  return '#f8fafc'
}

const getStatusBorderColor = (status: string) => {
  if (status === 'Disponível') return '#a7f3d0'
  if (status === 'Reservado') return '#fde68a'
  if (status === 'Indisponível') return '#fecaca'
  return '#e2e8f0'
}

const getStatusColor = (status: string) => {
  if (status === 'Disponível') return '#047857'
  if (status === 'Reservado') return '#b45309'
  if (status === 'Indisponível') return '#b91c1c'
  return '#475569'
}

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  border: 1px solid;

  background: ${({ status }) => getStatusBackground(status)};
  border-color: ${({ status }) => getStatusBorderColor(status)};
  color: ${({ status }) => getStatusColor(status)};
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button`
  border: 1px solid ${ds.colors.border};
  background: ${ds.colors.surface};
  border-radius: ${ds.radius.md};
  cursor: pointer;
  font-size: 16px;
  color: ${ds.colors.textSecondary};
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${ds.colors.primary};
    border-color: ${ds.colors.primaryLight};
  }
`