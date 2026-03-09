import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSidebar } from './SidebarContext'

import {
  Container,
  Logo,
  LogoImage,
  Nav,
  NavItem,
  Label,
  Footer,
  PinButton,
  ActionButton
} from './styles'

import {
  FiHome,
  FiBox,
  FiClipboard,
  FiPlusCircle,
  FiMapPin,
  FiLogOut,
  FiSettings 
} from 'react-icons/fi'

import logo from '../../assets/logo.PNG'

export const Sidebar = () => {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)

  const { setIsOpen } = useSidebar()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const saved = localStorage.getItem('sidebarPinned')
    if (saved === 'true') setPinned(true)
  }, [])

  useEffect(() => {
    if (pinned) setHovered(false)
  }, [pinned])

  const togglePin = () => {
    setPinned(prev => {
      const newState = !prev
      localStorage.setItem('sidebarPinned', newState.toString())
      return newState
    })
  }

  const isOpen = pinned || hovered

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen, setIsOpen])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <Container
      $open={isOpen}
      onMouseEnter={() => !pinned && setHovered(true)}
      onMouseLeave={() => !pinned && setHovered(false)}
    >
      <Logo $open={isOpen}>
        <LogoImage src={logo} alt="Logo" />
      </Logo>

      <Nav>
        <NavItem
          $open={isOpen}
          active={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        >
          <FiHome />
          <Label $open={isOpen}>Dashboard</Label>
        </NavItem>

        <NavItem
          $open={isOpen}
          active={location.pathname === '/stock'}
          onClick={() => navigate('/stock')}
        >
          <FiBox />
          <Label $open={isOpen}>Estoque</Label>
        </NavItem>

        <NavItem
          $open={isOpen}
          active={location.pathname === '/tickets'}
          onClick={() => navigate('/tickets')}
        >
          <FiClipboard />
          <Label $open={isOpen}>Ordens de Serviço</Label>
        </NavItem>

        <NavItem
          $open={isOpen}
          active={location.pathname === '/register'}
          onClick={() => navigate('/register')}
        >
          <FiPlusCircle />
          <Label $open={isOpen}>Registrar OS</Label>
        </NavItem>
      </Nav>

      <Footer>
        <ActionButton onClick={() => navigate('/settings')}>
          <FiSettings />
          <Label $open={isOpen}>Configurações</Label>
        </ActionButton>

        <ActionButton onClick={handleLogout}>
          <FiLogOut />
          <Label $open={isOpen}>Logout</Label>
        </ActionButton>

        <PinButton
          $active={pinned}
          onClick={togglePin}
          title={pinned ? 'Desafixar sidebar' : 'Fixar sidebar'}
        >
          <FiMapPin />
        </PinButton>
      </Footer>
    </Container>
  )
}
