import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const Loading = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${ds.colors.background};
  color: ${ds.colors.textSecondary};
`

export const Container = styled.div`
  min-height: 100vh;
  background: ${ds.colors.background};
  padding: ${ds.spacing.xl};
`

export const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto ${ds.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${ds.spacing.md};
  flex-wrap: wrap;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.md};

  h1 {
    margin: 0;
    color: ${ds.colors.textMain};
    font-size: ${ds.typography.size.xxl};
  }
`

export const SearchInput = styled.input`
  width: 100%;
  max-width: 460px;
  padding: 12px 14px;
  border-radius: ${ds.radius.md};
  border: 1px solid ${ds.colors.border};
  background: ${ds.colors.surface};

  &:focus {
    outline: none;
    border-color: ${ds.colors.primaryLight};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`

export const TableCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
`

export const TableHeader = styled.div`
  h2 {
    margin: 0 0 ${ds.spacing.md};
    color: ${ds.colors.textMain};
    font-size: ${ds.typography.size.lg};
  }
`

export const ErrorMessage = styled.div`
  padding: ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
`

export const EmptyMessage = styled.div`
  text-align: center;
  color: ${ds.colors.textSecondary};
  padding: ${ds.spacing.xl};
`

export const TruncatedText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`

export const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid ${ds.colors.border};
    color: ${ds.colors.textMain};
    font-size: ${ds.typography.size.sm};
  }

  th {
    color: ${ds.colors.textSecondary};
    font-weight: ${ds.typography.weight.semibold};
  }
`

export const Status = styled.span<{ status: string }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid;
  font-weight: ${ds.typography.weight.semibold};
  background: ${({ status }) =>
    status === 'Aberto'
      ? '#fef2f2'
      : status === 'Em Andamento'
        ? '#eff6ff'
        : status === 'Aguardando'
          ? '#fffbeb'
          : '#ecfdf5'};
  color: ${({ status }) =>
    status === 'Aberto'
      ? '#b91c1c'
      : status === 'Em Andamento'
        ? '#1d4ed8'
        : status === 'Aguardando'
          ? '#b45309'
          : '#047857'};
  border-color: ${({ status }) =>
    status === 'Aberto'
      ? '#fecaca'
      : status === 'Em Andamento'
        ? '#bfdbfe'
        : status === 'Aguardando'
          ? '#fde68a'
          : '#a7f3d0'};
`
