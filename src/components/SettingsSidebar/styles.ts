import styled, { css } from 'styled-components'

interface NavItemProps {
  active?: boolean
}

export const Container = styled.aside`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg} ${ds.spacing.sm};
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
`

export const Header = styled.div`
  padding: 0 ${ds.spacing.md} ${ds.spacing.md};
  margin-bottom: ${ds.spacing.md};
  border-bottom: 1px solid ${ds.colors.border};

  h3 {
    font-size: ${ds.typography.size.base};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
`

export const NavItem = styled.button<NavItemProps>`
  height: 42px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: ${ds.transitions.fast};
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 ${ds.spacing.md};
  border-radius: ${ds.radius.md};
  color: ${ds.colors.textSecondary};
  font-size: ${ds.typography.size.sm};

  svg {
    font-size: 18px;
  }

  ${({ active }) =>
    active &&
    css`
      background: ${ds.colors.primaryPale};
      color: ${ds.colors.primary};
      border-color: #bfdbfe;
      font-weight: ${ds.typography.weight.semibold};
    `}

  &:hover {
    background: ${ds.colors.surfaceHover};
    color: ${ds.colors.textMain};
  }
`

export const Label = styled.span`
  white-space: nowrap;
`
