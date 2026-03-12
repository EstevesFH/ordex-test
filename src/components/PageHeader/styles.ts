import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

/* Breadcrumbs */

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${ds.typography.size.sm};
  color: ${ds.colors.textSecondary};
`

export const BreadcrumbItem = styled.div<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:hover {
    color: ${({ $clickable }) =>
      $clickable ? ds.colors.primary : ds.colors.textSecondary};
  }
`

/* Back button */

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  border: none;
  background: transparent;

  font-size: ${ds.typography.size.sm};
  color: ${ds.colors.textSecondary};

  cursor: pointer;

  &:hover {
    color: ${ds.colors.primary};
  }
`

/* Main row */

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${ds.spacing.md};
  flex-wrap: wrap;
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

/* Title */

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h1 {
    margin: 0;
    font-size: ${ds.typography.size.xxxl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.primary};
  }
`

export const Subtitle = styled.span`
  font-size: ${ds.typography.size.sm};
  color: ${ds.colors.textSecondary};
`

export const Description = styled.p`
  margin: 0;
  font-size: ${ds.typography.size.base};
  color: ${ds.colors.textSecondary};
`

/* Badge */

export const Badge = styled.span`
  font-size: 12px;
  font-weight: ${ds.typography.weight.semibold};

  background: ${ds.colors.primaryPale};
  color: ${ds.colors.primary};

  padding: 4px 10px;
  border-radius: 999px;
`

/* Actions */

export const Actions = styled.div`
  display: flex;
  gap: ${ds.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
`