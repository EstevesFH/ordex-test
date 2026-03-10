import { useLocation, useNavigate } from 'react-router-dom'
import { FiMapPin, FiBox, FiLock } from 'react-icons/fi'
import * as S from './styles'

export const SettingsSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <S.Container>
      <S.Header>
        <h3>Configurações</h3>
      </S.Header>

      <S.Nav>
        <S.NavItem
          active={location.pathname.includes('/settings/accesses')}
          onClick={() => navigate('accesses')}
        >
          <FiLock />
          <S.Label>Acessos</S.Label>
        </S.NavItem>

        <S.NavItem
          active={location.pathname.includes('/settings/locations')}
          onClick={() => navigate('locations')}
        >
          <FiMapPin />
          <S.Label>Locais</S.Label>
        </S.NavItem>

        <S.NavItem
          active={location.pathname.includes('/settings/products')}
          onClick={() => navigate('products')}
        >
          <FiBox />
          <S.Label>Produtos</S.Label>
        </S.NavItem>
      </S.Nav>
    </S.Container>
  )
}
