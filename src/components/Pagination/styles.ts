import styled from 'styled-components'
import { designSystem as ds } from '../../styles/designSystem'

export const PaginationContainer = styled.div`
  margin-top: ${ds.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${ds.spacing.sm};
  padding: 10px 12px;
  border-radius: ${ds.radius.md};
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};

  > div:first-child {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  select {
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.sm};
    background: ${ds.colors.surface};
    color: ${ds.colors.textMain};
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
    }
  }

  span {
    font-size: 12px;
    color: ${ds.colors.textSecondary};
    font-weight: ${ds.typography.weight.medium};
  }

  > div:last-child {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`
