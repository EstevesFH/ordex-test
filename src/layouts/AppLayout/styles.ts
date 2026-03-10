import styled from 'styled-components';
import { designSystem as ds } from '@/styles/designSystem';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${ds.colors.background};
`;

export const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? '280px' : '80px')};
  background: ${ds.colors.surface};
  border-right: 1px solid ${ds.colors.border};
  display: flex;
  flex-direction: column;
  transition: ${ds.transitions.base};
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: ${ds.zIndex.sticky};
`;

export const LogoContainer = styled.div<{ $isOpen: boolean }>`
  padding: ${ds.spacing.xl};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  border-bottom: 1px solid ${ds.colors.border};
`;

export const LogoText = styled.h1<{ $isOpen: boolean }>`
  font-size: ${ds.typography.size.xxl};
  font-weight: ${ds.typography.weight.bold};
  color: ${ds.colors.primary};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin: 0;
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${ds.colors.textSecondary};
  display: flex;
  padding: ${ds.spacing.sm};
  border-radius: ${ds.radius.md};
  &:hover { background: ${ds.colors.surfaceHover}; }
`;

export const Nav = styled.nav`
  flex: 1;
  padding: ${ds.spacing.md};
  overflow-y: auto;
`;

export const NavItem = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${ds.spacing.md};
  padding: ${ds.spacing.md};
  margin-bottom: ${ds.spacing.sm};
  border-radius: ${ds.radius.md};
  cursor: pointer;
  transition: ${ds.transitions.fast};
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};

  background: ${({ $isActive }) => ($isActive ? ds.colors.primaryPale : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? ds.colors.primary : ds.colors.textSecondary)};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? ds.colors.primaryPale : ds.colors.surfaceHover)};
  }
`;

export const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '280px' : '80px')};
  transition: ${ds.transitions.base};
  min-height: 100vh;
`;

export const ContentArea = styled.div`
  padding: ${ds.spacing.xxl};
  max-width: 1400px;
  margin: 0 auto;
`;

export const Footer = styled.div`
  padding: ${ds.spacing.lg};
  border-top: 1px solid ${ds.colors.border};
`;

export const LogoutButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  gap: ${ds.spacing.md};
  width: 100%;
  padding: ${ds.spacing.md};
  background: transparent;
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.md};
  color: ${ds.colors.error};
  cursor: pointer;
  transition: ${ds.transitions.fast};

  &:hover {
    background: rgba(239, 68, 68, 0.05);
    border-color: ${ds.colors.error};
  }
`;