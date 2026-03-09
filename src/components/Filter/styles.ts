import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`

export const Modal = styled.div`
  /* Glassmorphism */
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  
  padding: 28px;
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.3px;
  }

  button {
    border: none;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
    letter-spacing: 0.2px;
  }

  input, select {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    font-size: 14px;
    width: 100%;
    color: #f1f5f9;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &::placeholder {
      color: #64748b;
    }
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &:hover {
      border-color: rgba(148, 163, 184, 0.3);
    }
  }
  
  select {
    cursor: pointer;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;

  button {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }

  .primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  .secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border: 1px solid rgba(148, 163, 184, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`
