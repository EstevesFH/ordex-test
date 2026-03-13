import { Outlet } from 'react-router-dom'
import * as S from './styles'

const Stock = () => {
  return (
    <S.Container>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  )
}

export { Stock }
