import styled, { css } from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.aside<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '280px' : '80px')};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${ds.zIndex.sticky};

  display: flex;
  flex-direction: column;
  overflow: visible;

  background: ${ds.colors.backgroundDark};
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 8px 0 30px rgba(2, 6, 23, 0.18);

  transition: width ${ds.transitions.base};

  @media (max-width: 768px) {
    width: ${({ $open }) => ($open ? '280px' : '0')};
  }
`

export const Header = styled.div<{ $open: boolean }>`
  height: 80px;
  padding: 0 ${ds.spacing.md};
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'space-between' : 'center')};
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

export const LogoArea = styled.div<{ $open: boolean }>`
  flex: ${({ $open }) => ($open ? 1 : 'unset')};
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${ds.colors.white};
`

export const LogoImage = styled.img<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '140px' : '36px')};
  height: ${({ $open }) => ($open ? '40px' : '36px')};
  object-fit: contain;
  display: block;
  transition: all ${ds.transitions.base};
`

export const TopToggleButton = styled.button<{ $open: boolean }>`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;

  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  transition: all ${ds.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${ds.colors.white};
  }
`

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: ${ds.spacing.md} 10px;
  overflow-y: auto;
`

export const IconWrap = styled.div<{ $open: boolean }>`
  width: 40px;
  min-width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: ${({ $open }) => ($open ? '0' : '0 auto')};
`

export const IconBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    flex-shrink: 0;
  }
`

export const NavItem = styled.button<{ $open: boolean; $active: boolean }>`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: transparent;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'flex-start' : 'center')};
  gap: ${({ $open }) => ($open ? '14px' : '0')};
  padding: ${({ $open }) => ($open ? '0 16px' : '0')};

  color: ${({ $active }) =>
    $active ? ds.colors.white : 'rgba(255,255,255,0.72)'};

  transition: all ${ds.transitions.fast};

  ${({ $active }) =>
    $active &&
    css`
      background: linear-gradient(
        90deg,
        rgba(34, 211, 238, 0.18) 0%,
        rgba(34, 211, 238, 0.06) 100%
      );
      box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.18);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        bottom: 10px;
        width: 3px;
        border-radius: 0 999px 999px 0;
        background: ${ds.colors.primaryLight};
      }
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${ds.colors.white};
  }
`

export const Label = styled.span<{ $open: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  width: ${({ $open }) => ($open ? 'auto' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateX(${({ $open }) => ($open ? '0' : '-6px')});
  font-size: ${ds.typography.size.sm};
  font-weight: ${ds.typography.weight.medium};

  transition:
    opacity ${ds.transitions.fast},
    transform ${ds.transitions.fast},
    width ${ds.transitions.fast};
`

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Chevron = styled.div<{ $open: boolean }>`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.72);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform ${ds.transitions.fast};
`

export const SubMenu = styled.div`
  position: relative;
  margin-left: 46px;
  padding: 4px 0 4px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 4px;
    width: 1px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
  }
`

export const SubItem = styled.button<{ $active?: boolean }>`
  height: 38px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;

  font-size: 13px;
  color: ${({ $active }) =>
    $active ? ds.colors.white : 'rgba(255,255,255,0.72)'};

  background: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.08)' : 'transparent'};

  transition: all ${ds.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${ds.colors.white};
  }
`

export const SubItemIcon = styled.div`
  width: 16px;
  min-width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Footer = styled.div`
  position: relative;
  padding: ${ds.spacing.md} 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`

export const ProfileCard = styled.button<{ $open: boolean }>`
  width: 100%;
  min-height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'flex-start' : 'center')};
  gap: ${({ $open }) => ($open ? '12px' : '0')};
  padding: ${({ $open }) => ($open ? '12px' : '10px 0')};

  transition: all ${ds.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

export const ProfileAvatar = styled.div`
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: ${ds.colors.white};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
`

export const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`

export const ProfileName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${ds.colors.white};
  line-height: 1.2;
`

export const ProfileRole = styled.span`
  margin-top: 2px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.2;
`

export const ProfileMenuDots = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-size: 20px;
  line-height: 1;
`

export const ProfileFlyout = styled.div<{ $open: boolean }>`
  position: absolute;
  left: ${({ $open }) => ($open ? 'calc(100% + 12px)' : 'calc(100% + 10px)')};
  bottom: 10px;
  width: 260px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.18);
  overflow: hidden;
  z-index: 999;
`

export const ProfileFlyoutHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
`

export const ProfileFlyoutAvatar = styled.div`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 999px;
  background: #f1f5f9;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
`

export const ProfileFlyoutInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

export const ProfileFlyoutName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.2;
`

export const ProfileFlyoutMenu = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const FlyoutItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  height: 42px;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;

  color: ${({ $danger }) => ($danger ? '#dc2626' : '#0f172a')};
  font-size: 14px;
  font-weight: 500;

  transition: background ${ds.transitions.fast};

  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(220, 38, 38, 0.08)' : '#f8fafc'};
  }

  svg {
    flex-shrink: 0;
  }
`

export const LogoToggleArea = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'space-between' : 'center')};
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const CollapsedMenuIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
`

export const CollapsedSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 4px 0 8px;
`

export const CollapsedSubItem = styled.button<{ $active?: boolean }>`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? 'rgba(59, 130, 246, 0.15)' : 'transparent'};
  color: ${({ $active }) => ($active ? '#60a5fa' : '#94a3b8')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }
`

export const UnpinButton = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  color: ${ds.colors.white};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`