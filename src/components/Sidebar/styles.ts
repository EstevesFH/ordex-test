import styled, { css } from 'styled-components';

interface ContainerProps {
  $open: boolean;
}

interface NavItemProps {
  active?: boolean;
  $open: boolean;
}

export const Container = styled.aside<ContainerProps>`
  width: ${({ $open }) => ($open ? '280px' : '135px')};
  height: 100vh;
  
  /* Glassmorphism sidebar */
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid rgba(148, 163, 184, 0.1);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 24px 0;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    width: ${({ $open }) => ($open ? '280px' : '0')};
  }
`;

export const Logo = styled.div<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '185px' : '48px')};
  height: 48px;
  border-radius: 12px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0 32px ${({ $open }) => ($open ? '24px' : '16px')};

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
`

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 90%;
  gap: 8px;
`;

export const NavItem = styled.button<NavItemProps>`
  height: 48px;
  border: none;
  background: transparent;
  color: #cbd5e1;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  gap: 16px;

  padding-left: ${({ $open }) => ($open ? '24px' : '20px')};
  transition: all 0.3s ease;

  svg {
    font-size: 22px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  ${({ active }) =>
    active &&
    css`
      background: rgba(59, 130, 246, 0.15);
      border-radius: 12px;
      color: #60a5fa;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background: linear-gradient(180deg, #3b82f6, #2563eb);
        border-radius: 0 4px 4px 0;
      }
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: #f1f5f9;
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const Label = styled.span<{ $open: boolean }>`
  white-space: nowrap;
  font-size: 14px;
  opacity: 0;
  transform: translateX(-8px);

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}

  transition: opacity 0.2s ease, transform 0.2s ease;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 16px;
`;

export const UpgradeButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const PinButton = styled.button<{ $active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;

  background: ${({ $active }) =>
    $active ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(148, 163, 184, 0.2)'};

  color: ${({ $active }) => ($active ? '#60a5fa' : '#cbd5e1')};
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 18px;
    transform: ${({ $active }) =>
      $active ? 'rotate(0deg)' : 'rotate(-45deg)'};
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.4);
    color: #60a5fa;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;

  opacity: 0.85;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    opacity: 1;
  }

  svg {
    font-size: 18px;
  }
`
