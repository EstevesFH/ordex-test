import styled, { css } from 'styled-components'

interface NavItemProps {
  active?: boolean
}

export const Container = styled.aside`
  width: 220px;
  height: 100vh;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(148, 163, 184, 0.1);

  display: flex;
  flex-direction: column;

  padding: 40px 0;
  border-radius: 24px 0 0 24px;

  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);

  position: relative;
  z-index: 150;
`

export const Header = styled.div`
  padding: 0 24px 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.2px;
  }
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 12px;
`

export const NavItem = styled.button<NavItemProps>`
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 12px;
  border-radius: 10px;

  color: #94a3b8;
  font-size: 14px;

  svg {
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  ${({ active }) =>
    active &&
    css`
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      font-weight: 600;
      border-left: 3px solid #3b82f6;
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    
    svg {
      transform: scale(1.1);
    }
  }
`

export const Label = styled.span`
  white-space: nowrap;
`
