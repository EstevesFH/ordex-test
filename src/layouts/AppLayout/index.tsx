import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import * as S from './styles'

export const AppLayout: FC = () => {
  return (
    <S.Wrapper>
      <Sidebar />

      <S.MainContent>
        <S.ContentArea>
          <Outlet />
        </S.ContentArea>
      </S.MainContent>
    </S.Wrapper>
  )
}