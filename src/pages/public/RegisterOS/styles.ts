import styled from 'styled-components';
import { designSystem } from '../../../styles/designSystem';

export const Container = styled.div`
  position: relative;
  height: 100vh; // Fixado na altura da tela
  width: 100vw;
  overflow: hidden; // Remove scroll se possível
  padding: 20px; // Reduzido de 40px
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
`;

export const Header = styled.header`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; // Reduzido de 40px
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    color: ${designSystem.colors.white};
    font-size: 1.5rem; // Reduzido de 1.8rem
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
  }
`;

export const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 8px; // Reduzido
  color: ${designSystem.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #ffffff;
    transform: translateX(-3px);
  }
`;

export const FormCard = styled.div`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px; // Reduzido de 24px
  padding: 24px 32px; // Reduzido de 40px
  width: 100%;
  max-width: 900px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.1rem; // Reduzido
    color: #1f2937;
    margin-bottom: 20px; // Reduzido de 32px
    font-weight: 700;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px; // Reduzido de 24px
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.85rem; // Mais compacto
    font-weight: 600;
    color: #4b5563;
    padding-left: 2px;
  }

  select, textarea {
    width: 100%;
    padding: 10px 14px; // Reduzido de 14px
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(209, 213, 219, 0.4);
    border-radius: 10px;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: ${designSystem.colors.primary};
      background: #ffffff;
    }
  }

  textarea {
    resize: none; // Evita que o usuário quebre o layout aumentando o campo
  }
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px; // Reduzido de 32px
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

  h2 {
    color: #10b981;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 16px;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 24px;
  }
`;

export const ProtocolBadge = styled.div`
  background: #f3f4f6;
  padding: 12px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  border: 1px dashed #d1d5db;
`;