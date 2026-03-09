import { useNavigate } from 'react-router-dom';
import Iridescence from '../../../components/ReactBits/Iridescence';
import * as S from './styles';
import Button from '../../../components/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <S.FullPageContainer>
      <Iridescence 
        color={[0.12, 0.24, 0.45]}
        speed={0.3}
        amplitude={0.15}
        mouseReact={false}
      />

      <S.MainContent>
        <S.HeroTitle>
          <img src="/logo.PNG" alt="ORDEX Logo" width={400} height={80} />
        </S.HeroTitle>
        
        <S.ButtonGroup>
          <Button primary onClick={() => navigate('/register-os')}>
            Novo Chamado
          </Button>

          <Button onClick={() => navigate('/login')}>
            Painel de Gestão
          </Button>
        </S.ButtonGroup>
      </S.MainContent>
    </S.FullPageContainer>
  );
};

export { HomePage };