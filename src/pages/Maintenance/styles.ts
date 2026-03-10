import styled, { keyframes } from 'styled-components'

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at top left, #1e3a8a 0%, #0f172a 50%, #020617 100%);
  background-attachment: fixed;
  padding: 24px;
  position: relative;
  overflow: hidden;
`

export const Card = styled.div`
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 64px 48px;
  border-radius: 32px;
  width: 100%;
  max-width: 600px;
  box-shadow: 
    0 25px 70px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 10;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 600px) {
    padding: 48px 32px;
  }
`

interface IconWrapperProps {
  $type: 'maintenance' | 'error'
}

export const IconWrapper = styled.div<IconWrapperProps>`
  width: 120px;
  height: 120px;
  background: ${props => props.$type === 'maintenance' 
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.3))'
    : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.3))'
  };
  backdrop-filter: blur(12px);
  border: 2px solid ${props => props.$type === 'maintenance' 
    ? 'rgba(59, 130, 246, 0.3)'
    : 'rgba(239, 68, 68, 0.3)'
  };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: ${props => props.$type === 'maintenance'
    ? '0 8px 30px rgba(59, 130, 246, 0.3)'
    : '0 8px 30px rgba(239, 68, 68, 0.3)'
  };
  
  svg {
    color: ${props => props.$type === 'maintenance' ? '#60a5fa' : '#fca5a5'};
    animation: ${pulse} 2s ease-in-out infinite;
  }
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #f1f5f9;
  margin: 0;
  letter-spacing: -1px;
  
  background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`

export const Message = styled.p`
  font-size: 16px;
  color: #cbd5e1;
  text-align: center;
  margin: 0;
  line-height: 1.7;
  max-width: 450px;
`

export const InfoBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  width: 100%;
  margin-top: 16px;

  p {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #f1f5f9;
      font-weight: 600;
    }
  }
`

export const RetryButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-top: 8px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(180deg);
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  width: 100%;
  justify-content: center;

  span {
    font-size: 13px;
    color: #94a3b8;
  }
`

interface StatusIndicatorProps {
  $active: boolean
}

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
    : 'linear-gradient(135deg, #ef4444, #dc2626)'
  };
  box-shadow: ${props => props.$active
    ? '0 0 10px rgba(251, 191, 36, 0.5)'
    : '0 0 10px rgba(239, 68, 68, 0.5)'
  };
  animation: ${pulse} 2s ease-in-out infinite;
`

export const BackgroundBlobs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
`

interface BlobProps {
  $position: 'top-left' | 'bottom-right'
}

export const Blob = styled.div<BlobProps>`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: ${float} 8s ease-in-out infinite;
  
  ${props => props.$position === 'top-left' && `
    top: -200px;
    left: -200px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    animation-delay: 0s;
  `}
  
  ${props => props.$position === 'bottom-right' && `
    bottom: -200px;
    right: -200px;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    animation-delay: 2s;
  `}

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`
