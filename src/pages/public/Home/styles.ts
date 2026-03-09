import styled from 'styled-components';
import { designSystem } from '../../../styles/designSystem';

export const FullPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background: #f8fafc;
  font-family: ${designSystem.typography.fontFamily};
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 50px;
  color: ${designSystem.colors.primary};
  
  h1 {
    font-size: 1.6rem;
    font-weight: 900;
    margin: 0;
    letter-spacing: -1px;
  }
`;

// Botão estilo "Ghost" para a Sidebar
export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    color: ${designSystem.colors.primary};
  }
`;

// CONTEÚDO CENTRAL
export const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const BadgeText = styled.span`
  background: rgba(255, 255, 255, 0.6);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${designSystem.colors.primary};
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h2`
  font-size: 3.8rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;