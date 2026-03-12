import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiHome,
  FiClipboard,
  FiBox,
  FiEdit3,
  FiMenu,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiLock,
  FiMapPin,
} from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { getSessionUser } from '@/utils/session'
import * as S from './styles'

type MenuChild = {
  label: string
  path: string
  icon?: React.ComponentType<{ size?: number }>
}

type MenuItem = {
  icon: React.ComponentType<{ size?: number }>
  label: string
  path?: string
  children?: MenuChild[]
}

export const Sidebar = () => {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const profileRef = useRef<HTMLDivElement | null>(null)

  const user = getSessionUser()
  const role = user?.role || 'Operador'

  useEffect(() => {
    const saved = localStorage.getItem('sidebarPinned')
    if (saved === 'true') {
      setPinned(true)
    }
  }, [])

  useEffect(() => {
    if (location.pathname.includes('/settings')) {
      setSettingsOpen(true)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isOpen = pinned || hovered

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isOpen ? '280px' : '80px',
    )

    return () => {
      document.documentElement.style.setProperty('--sidebar-width', '80px')
    }
  }, [isOpen])

  const togglePin = () => {
    setPinned(prev => {
      const newState = !prev
      localStorage.setItem('sidebarPinned', String(newState))
      return newState
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  const menuItems = useMemo<MenuItem[]>(() => {
    const baseMenu: MenuItem[] = [
      { icon: FiHome, label: 'Painel de Controle', path: '/dashboard' },
      { icon: FiClipboard, label: 'Ordens de Serviço', path: '/tickets' },
      { icon: FiBox, label: 'Estoque', path: '/stock' },
      { icon: FiEdit3, label: 'Registrar OS', path: '/register' },
      {
        icon: FiSettings,
        label: 'Ajustes',
        children: [
          { label: 'Acessos', path: '/settings/accesses', icon: FiLock },
          { label: 'Locais', path: '/settings/locations', icon: FiMapPin },
          { label: 'Produtos', path: '/settings/products', icon: FiBox },
        ],
      },
    ]

    if (role === 'Operador') {
      return baseMenu.filter(
        item =>
          item.label === 'Tickets' ||
          item.label === 'Registrar OS' ||
          item.label === 'Parametrizações',
      )
    }

    if (role === 'Supervisor') {
      return baseMenu.filter(
        item =>
          item.label === 'Dashboard' ||
          item.label === 'Tickets' ||
          item.label === 'Estoque' ||
          item.label === 'Parametrizações',
      )
    }

    return baseMenu
  }, [role])

  return (
    <S.Container
      $open={isOpen}
      onMouseEnter={() => {
        if (!pinned) setHovered(true)
      }}
      onMouseLeave={() => {
        if (!pinned) setHovered(false)
      }}
    >
      <S.Header $open={isOpen}>
        <S.LogoArea $open={isOpen}>
          <S.LogoImage
            src={isOpen ? '/logo.png' : '/icon.png'}
            alt="ORDEX Logo"
            $open={isOpen}
          />
        </S.LogoArea>

        <S.TopToggleButton
          type="button"
          onClick={togglePin}
          title={pinned ? 'Desafixar sidebar' : 'Fixar sidebar'}
          $open={isOpen}
        >
          <FiMenu size={18} />
        </S.TopToggleButton>
      </S.Header>

      <S.Nav>
        {menuItems.map(item => {
          const Icon = item.icon

          if (item.children) {
            return (
              <S.SettingsWrapper key={item.label}>
                <S.NavItem
                  type="button"
                  $open={isOpen}
                  $active={location.pathname.includes('/settings')}
                  onClick={() => setSettingsOpen(prev => !prev)}
                  title={isOpen ? '' : item.label}
                >
                  <S.IconWrap $open={isOpen}>
                    <S.IconBox>
                      <Icon size={20} />
                    </S.IconBox>
                  </S.IconWrap>

                  <S.Label $open={isOpen}>{item.label}</S.Label>

                  {isOpen && (
                    <S.Chevron $open={settingsOpen}>
                      <FiChevronDown size={16} />
                    </S.Chevron>
                  )}
                </S.NavItem>

                {settingsOpen && isOpen && (
                  <S.SubMenu>
                    {item.children.map(child => {
                      const ChildIcon = child.icon

                      return (
                        <S.SubItem
                          key={child.path}
                          type="button"
                          $active={location.pathname.includes(child.path)}
                          onClick={() => navigate(child.path)}
                        >
                          <S.SubItemIcon>
                            {ChildIcon && <ChildIcon size={15} />}
                          </S.SubItemIcon>
                          <span>{child.label}</span>
                        </S.SubItem>
                      )
                    })}
                  </S.SubMenu>
                )}
              </S.SettingsWrapper>
            )
          }

          const isActive = location.pathname.startsWith(item.path || '')

          return (
            <S.NavItem
              key={item.path}
              $open={isOpen}
              $active={isActive}
              onClick={() => item.path && navigate(item.path)}
              title={isOpen ? '' : item.label}
              type="button"
            >
              <S.IconWrap $open={isOpen}>
                <S.IconBox>
                  <Icon size={20} />
                </S.IconBox>
              </S.IconWrap>

              <S.Label $open={isOpen}>{item.label}</S.Label>
            </S.NavItem>
          )
        })}
      </S.Nav>

      <S.Footer ref={profileRef}>
        <S.ProfileCard
          type="button"
          onClick={() => setProfileOpen(prev => !prev)}
          $open={isOpen}
        >
          <S.ProfileAvatar>
            <FiUser size={20} />
          </S.ProfileAvatar>

          {isOpen && (
            <>
              <S.ProfileInfo>
                <S.ProfileName>{user?.name || 'Usuário'}</S.ProfileName>
                <S.ProfileRole>{user?.role || 'Operador'}</S.ProfileRole>
              </S.ProfileInfo>

              <S.ProfileMenuDots>⋯</S.ProfileMenuDots>
            </>
          )}
        </S.ProfileCard>

        {profileOpen && (
          <S.ProfileFlyout $open={isOpen}>
            <S.ProfileFlyoutMenu>
              <S.FlyoutItem
                type="button"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/profile')
                }}
              >
                <FiUser size={16} />
                <span>Meu perfil</span>
              </S.FlyoutItem>

              <S.FlyoutItem
                type="button"
                $danger
                onClick={() => {
                  setProfileOpen(false)
                  handleLogout()
                }}
              >
                <FiLogOut size={16} />
                <span>Sair</span>
              </S.FlyoutItem>
            </S.ProfileFlyoutMenu>
          </S.ProfileFlyout>
        )}
      </S.Footer>
    </S.Container>
  )
}