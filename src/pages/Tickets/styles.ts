import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Header = styled.div`
  margin-bottom: ${ds.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${ds.spacing.md};

  h1 {
    font-size: ${ds.typography.size.xxl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
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

export const Status = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};
  border: 1px solid;

  background: ${({ status }) =>
    status === 'Aberto'
      ? '#fef2f2'
      : status === 'Em Andamento'
        ? '#eff6ff'
        : status === 'Aguardando'
          ? '#fffbeb'
          : '#ecfdf5'};

  border-color: ${({ status }) =>
    status === 'Aberto'
      ? '#fecaca'
      : status === 'Em Andamento'
        ? '#bfdbfe'
        : status === 'Aguardando'
          ? '#fde68a'
          : '#a7f3d0'};

  color: ${({ status }) =>
    status === 'Aberto'
      ? '#b91c1c'
      : status === 'Em Andamento'
        ? '#1d4ed8'
        : status === 'Aguardando'
          ? '#b45309'
          : '#047857'};
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
