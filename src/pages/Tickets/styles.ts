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

export const LoaderWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`