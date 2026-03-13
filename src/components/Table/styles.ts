import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

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

export const TruncatedText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`