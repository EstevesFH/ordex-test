import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useToast } from '@/hooks/useToast'
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi'

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <Container>
      {toasts.map(toast => (
        <ToastItem key={toast.id} type={toast.type}>
          <IconWrapper type={toast.type}>
            {toast.type === 'success' && <FiCheckCircle size={20} />}
            {toast.type === 'error' && <FiXCircle size={20} />}
            {toast.type === 'warning' && <FiAlertTriangle size={20} />}
            {toast.type === 'info' && <FiInfo size={20} />}
          </IconWrapper>

          <Message>{toast.message}</Message>

          <CloseButton onClick={() => removeToast(toast.id)}>
            <FiX size={18} />
          </CloseButton>
        </ToastItem>
      ))}
    </Container>
  )
}

export default ToastContainer

// ========================================
// STYLED COMPONENTS
// ========================================

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const Container = styled.div`
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
  width: 100%;

  @media (max-width: 600px) {
    right: 16px;
    left: 16px;
    max-width: calc(100% - 32px);
  }
`

interface ToastItemProps {
  type: 'success' | 'error' | 'warning' | 'info'
}

const getToastColors = (type: string) => {
  switch (type) {
    case 'success':
      return {
        bg: '#d1fae5',
        border: '#10b981',
        text: '#065f46',
      }
    case 'error':
      return {
        bg: '#fee2e2',
        border: '#ef4444',
        text: '#991b1b',
      }
    case 'warning':
      return {
        bg: '#fef3c7',
        border: '#f59e0b',
        text: '#92400e',
      }
    case 'info':
    default:
      return {
        bg: '#dbeafe',
        border: '#3b82f6',
        text: '#1e40af',
      }
  }
}

const ToastItem = styled.div<ToastItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${props => getToastColors(props.type).bg};
  border-left: 4px solid ${props => getToastColors(props.type).border};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
  position: relative;
`

const IconWrapper = styled.div<{ type: string }>`
  color: ${props => getToastColors(props.type).border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const Message = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.5;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #374151;
  }
`
