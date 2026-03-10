import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import * as S from './styles'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <S.FullPageContainer>
      <S.MainContent>
        <S.BrandCard>
          <img src="/logo.PNG" alt="ORDEX Logo" width={280} height={56} />
          <S.Subtitle>Sistema de abertura e acompanhamento de ordens de serviço</S.Subtitle>

          <S.ButtonGroup>
            <Button primary onClick={() => navigate('/register')}>
              Novo Chamado
            </Button>
            <Button onClick={() => navigate('/view-tickets')}>Consultar OS</Button>
            <Button onClick={() => navigate('/login')}>Painel de Gestão</Button>
          </S.ButtonGroup>
        </S.BrandCard>
      </S.MainContent>
    </S.FullPageContainer>
  )
}

export { HomePage }
