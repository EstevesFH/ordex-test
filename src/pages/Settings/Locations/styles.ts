import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  padding: ${ds.spacing.md};
`

export const Header = styled.div`
  margin-bottom: ${ds.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${ds.spacing.md};

  h1 {
    margin: 0;
    font-size: ${ds.typography.size.xxl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
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
  min-height: 150px;
`

export const TableWrapper = styled.div`
  max-height: 440px;
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
  background: ${({ status }) => (status === 'Ativo' ? '#ecfdf5' : '#fef2f2')};
  border-color: ${({ status }) => (status === 'Ativo' ? '#a7f3d0' : '#fecaca')};
  color: ${({ status }) => (status === 'Ativo' ? '#047857' : '#b91c1c')};
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
    transition: ${ds.transitions.fast};

    &:hover {
      color: ${ds.colors.primary};
      border-color: ${ds.colors.primaryLight};
    }
  }
`

export const NoData = styled.div`
  text-align: center;
  padding: ${ds.spacing.xl} 0;
  font-size: ${ds.typography.size.base};
  color: ${ds.colors.textSecondary};
`
