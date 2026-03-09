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
  max-width: 760px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  
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

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`

export const Field = styled.div<{ full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ full }) => (full ? '1 / -1' : 'auto')};

  label {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
  }

  input,
  textarea,
  select {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    font-size: 14px;
    background: rgba(0, 0, 0, 0.2);
    color: #f1f5f9;
    resize: vertical;
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

  input:disabled,
  textarea:disabled {
    background: rgba(0, 0, 0, 0.4);
    color: #94a3b8;
    cursor: not-allowed;
  }
  
  select {
    cursor: pointer;
  }
`

export const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  button {
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
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