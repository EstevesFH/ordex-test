import styled from 'styled-components'
import { designSystem as ds } from '../../styles/designSystem'

export interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'tertiary'
  $primary?: boolean
}

export const ActionButton = styled.button<StyledButtonProps>`
  padding: 10px 16px;
  border-radius: ${ds.radius.md};
  font-weight: ${ds.typography.weight.semibold};
  font-size: ${ds.typography.size.sm};
  cursor: pointer;
  transition: ${ds.transitions.fast};
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: ${({ $variant, $primary }) => {
    if ($primary || $variant === 'primary') return ds.colors.primary
    if ($variant === 'secondary') return ds.colors.surface
    return 'transparent'
  }};

  color: ${({ $variant, $primary }) => {
    if ($primary || $variant === 'primary') return ds.colors.white
    if ($variant === 'secondary') return ds.colors.textMain
    return ds.colors.textSecondary
  }};

  border-color: ${({ $variant, $primary }) => {
    if ($primary || $variant === 'primary') return ds.colors.primary
    return ds.colors.border
  }};

  &:hover {
    background: ${({ $variant, $primary }) => {
      if ($primary || $variant === 'primary') return ds.colors.primaryHover
      if ($variant === 'secondary') return ds.colors.surfaceHover
      return ds.colors.surfaceHover
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
