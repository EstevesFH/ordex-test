import styled from 'styled-components';
import { designSystem } from '../../styles/designSystem';

// Interface para as props do Styled Component
export interface StyledButtonProps {
  $primary?: boolean;
}

export const ActionButton = styled.button<StyledButtonProps>`
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Lógica de Cores e Fundo */
  background: ${props => props.$primary ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
  color: ${designSystem.colors.primary};
  
  /* Efeito de Vidro (Glassmorphism) */
  backdrop-filter: ${props => props.$primary ? 'none' : 'blur(10px)'};
  -webkit-backdrop-filter: ${props => props.$primary ? 'none' : 'blur(10px)'};
  
  /* Borda e Sombra */
  border: ${props => props.$primary ? 'none' : '1px solid rgba(255, 255, 255, 0.5)'};
  box-shadow: ${props => props.$primary ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'};

  &:hover {
    transform: translateY(-3px);
    background: ${props => props.$primary ? '#f8fafc' : 'rgba(255, 255, 255, 0.4)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;