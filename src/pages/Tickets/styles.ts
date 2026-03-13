import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.xl};
  `

export const Controls = styled.div`
  display: flex;
  gap: ${ds.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
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
    font-size: ${ds.typography.size.lg};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
`

export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${ds.spacing.xl} ${ds.spacing.md};
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${ds.radius.md};
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: ${ds.spacing.xl} ${ds.spacing.md};
  color: ${ds.colors.textSecondary};
`

export const TruncatedText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`

export const TableWrapper = styled.div`
  max-height: 460px;
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
    z-index: 1;
  }

  td {
    padding: 12px 8px;
    font-size: ${ds.typography.size.sm};
    color: ${ds.colors.textMain};
    border-bottom: 1px solid ${ds.colors.border};
  }
`

const getStatusBackground = (status: string) => {
  if (status === 'Aberto') return '#fef2f2';
  if (status === 'Em Andamento') return '#eff6ff';
  if (status === 'Aguardando') return '#fffbeb';
  return '#ecfdf5';
};

const getStatusBorderColor = (status: string) => {
  if (status === 'Aberto') return '#fecaca';
  if (status === 'Em Andamento') return '#bfdbfe';
  if (status === 'Aguardando') return '#fde68a';
  return '#a7f3d0';
};

const getStatusColor = (status: string) => {
  if (status === 'Aberto') return '#b91c1c';
  if (status === 'Em Andamento') return '#1d4ed8';
  if (status === 'Aguardando') return '#b45309';
  return '#047857';
};

export const Status = styled.span<{ status: string }>`
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

  button {
    border: 1px solid ${ds.colors.border};
    background: ${ds.colors.surface};
    border-radius: ${ds.radius.md};
    cursor: pointer;
    font-size: 16px;
    color: ${ds.colors.textSecondary};
    padding: 6px;

    &:hover {
      color: ${ds.colors.primary};
      border-color: ${ds.colors.primaryLight};
    }
  }
`
