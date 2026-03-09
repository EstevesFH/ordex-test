import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiClipboard, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import * as S from './styles';

export const AppLayout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) setSidebarOpen(saved === 'true');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarOpen', newState.toString());
      return newState;
    });
  }, []);

  const menuItems = useMemo(() => [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiClipboard, label: 'Tickets', path: '/tickets' },
    { icon: FiSettings, label: 'Configurações', path: '/settings' },
  ], []);

  return (
    <S.Wrapper>
      <S.Sidebar $isOpen={sidebarOpen}>
        <S.LogoContainer $isOpen={sidebarOpen}>
          <S.LogoText $isOpen={sidebarOpen}>ORDEX</S.LogoText>
          <S.ToggleButton onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </S.ToggleButton>
        </S.LogoContainer>

        <S.Nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <S.NavItem
                key={item.path}
                $isActive={isActive}
                $isOpen={sidebarOpen}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </S.NavItem>
            );
          })}
        </S.Nav>

        <S.Footer>
          <S.LogoutButton $isOpen={sidebarOpen} onClick={() => navigate('/login')}>
            <FiLogOut size={20} />
            {sidebarOpen && <span>Sair</span>}
          </S.LogoutButton>
        </S.Footer>
      </S.Sidebar>

      <S.MainContent $sidebarOpen={sidebarOpen}>
        <S.ContentArea>
          <Outlet />
        </S.ContentArea>
      </S.MainContent>
    </S.Wrapper>
  );
};