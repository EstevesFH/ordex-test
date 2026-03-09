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
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 32px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
  }

  input, select {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    font-size: 14px;
    background: rgba(0, 0, 0, 0.2);
    color: #f1f5f9;
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
  }
  
  select {
    cursor: pointer;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`
