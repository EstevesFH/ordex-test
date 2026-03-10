import { Outlet } from 'react-router-dom'
import { SettingsSidebar } from '@/components/SettingsSidebar'
import * as S from './styles'

const Settings = () => {
  return (
    <S.Container>
      <SettingsSidebar />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  )
}

export { Settings }
