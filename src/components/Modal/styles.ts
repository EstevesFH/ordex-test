import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
  padding: 20px;
`

export const Modal = styled.div`
  /* Glassmorphism effect */
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  
  padding: 36px;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  text-align: center;

  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  animation: ${scaleIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #f1f5f9;
  letter-spacing: -0.3px;
`

export const Message = styled.p`
  font-size: 15px;
  color: #cbd5e1;
  line-height: 1.6;

  strong {
    color: #f1f5f9;
    font-weight: 600;
  }
`

export const Actions = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 12px;
  justify-content: center;

  button {
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
`
