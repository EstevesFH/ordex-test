import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiHome,
  FiClipboard,
  FiBox,
  FiEdit3,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiLock,
  FiMapPin,
  FiSidebar,
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
  const [pinned, setPinned] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [logoHovered, setLogoHovered] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const profileRef = useRef<HTMLDivElement | null>(null)

  const user = getSessionUser()
  const role = user?.role || 'Operador'
  const isOpen = pinned

  useEffect(() => {
    const saved = localStorage.getItem('sidebarPinned')
    if (saved === 'true') {
      setPinned(true)
    }
  }, [])

  useEffect(() => {
    if (location.pathname.startsWith('/settings')) {
      setOpenSubmenu('Ajustes')
      return
    }

    if (location.pathname.startsWith('/stock')) {
      setOpenSubmenu('Estoque')
      return
    }

    setOpenSubmenu(null)
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
    setPinned((prev) => {
      const next = !prev
      localStorage.setItem('sidebarPinned', String(next))
      return next
    })
  }

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label))
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
      {
        icon: FiBox,
        label: 'Estoque',
        children: [
          { label: 'Almoxarifado', path: '/stock/warehouse', icon: FiLock },
          { label: 'Inventário', path: '/stock/assets', icon: FiMapPin },
        ],
      },
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
        (item) =>
          item.label === 'Ordens de Serviço' ||
          item.label === 'Registrar OS',
      )
    }

    if (role === 'Supervisor') {
      return baseMenu.filter(
        (item) =>
          item.label === 'Painel de Controle' ||
          item.label === 'Ordens de Serviço' ||
          item.label === 'Estoque',
      )
    }

    return baseMenu
  }, [role])

  let logoSrc: string | null = null
  let LogoIcon: React.ComponentType<{ size?: number }> | null = null

  if (isOpen) {
    logoSrc = '/logo.png'
  } else if (logoHovered) {
    LogoIcon = FiSidebar
  } else {
    logoSrc = '/icon.png'
  }

  return (
    <S.Container $open={isOpen}>
      <S.Header $open={isOpen}>
        <S.LogoToggleArea
          type="button"
          $open={isOpen}
          onClick={() => {
            if (!isOpen) togglePin()
          }}
          onMouseEnter={() => {
            if (!isOpen) setLogoHovered(true)
          }}
          onMouseLeave={() => {
            if (!isOpen) setLogoHovered(false)
          }}
          title={isOpen ? 'Sidebar fixa' : 'Abrir sidebar'}
        >
          <S.LogoArea $open={isOpen}>
            {LogoIcon ? (
              <LogoIcon size={20} />
            ) : (
              <S.LogoImage
                src={logoSrc || ''}
                alt="ORDEX Logo"
                $open={isOpen}
              />
            )}
          </S.LogoArea>
        </S.LogoToggleArea>

        {isOpen && (
          <S.UnpinButton
            type="button"
            onClick={togglePin}
            title="Desfixar sidebar"
          >
            <FiSidebar size={20} />
          </S.UnpinButton>
        )}
      </S.Header>

      <S.Nav>
        {menuItems.map((item) => {
          const Icon = item.icon

          if (item.children) {
            const isChildActive = item.children.some((child) =>
              location.pathname.startsWith(child.path),
            )

            const isSubmenuOpen = openSubmenu === item.label

            return (
              <S.SettingsWrapper key={item.label}>
                <S.NavItem
                  type="button"
                  $open={isOpen}
                  $active={isChildActive}
                  onClick={() => toggleSubmenu(item.label)}
                  title={isOpen ? '' : item.label}
                >
                  <S.IconWrap $open={isOpen}>
                    <S.IconBox>
                      <Icon size={20} />
                    </S.IconBox>
                  </S.IconWrap>

                  <S.Label $open={isOpen}>{item.label}</S.Label>

                  {isOpen && (
                    <S.Chevron $open={isSubmenuOpen}>
                      <FiChevronDown size={16} />
                    </S.Chevron>
                  )}
                </S.NavItem>

                {isSubmenuOpen &&
                  (isOpen ? (
                    <S.SubMenu>
                      {item.children.map((child) => {
                        const ChildIcon = child.icon

                        return (
                          <S.SubItem
                            key={child.path}
                            type="button"
                            $active={location.pathname.startsWith(child.path)}
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
                  ) : (
                    <S.CollapsedSubMenu>
                      {item.children.map((child) => {
                        const ChildIcon = child.icon

                        return (
                          <S.CollapsedSubItem
                            key={child.path}
                            type="button"
                            title={child.label}
                            $active={location.pathname.startsWith(child.path)}
                            onClick={() => navigate(child.path)}
                          >
                            {ChildIcon && <ChildIcon size={16} />}
                          </S.CollapsedSubItem>
                        )
                      })}
                    </S.CollapsedSubMenu>
                  ))}
              </S.SettingsWrapper>
            )
          }

          const isActive = location.pathname.startsWith(item.path || '')

          return (
            <S.NavItem
              key={item.path}
              type="button"
              $open={isOpen}
              $active={isActive}
              onClick={() => item.path && navigate(item.path)}
              title={isOpen ? '' : item.label}
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
          onClick={() => setProfileOpen((prev) => !prev)}
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