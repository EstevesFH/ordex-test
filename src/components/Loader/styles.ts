import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
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

export const LoaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at top left, #1e3a8a 0%, #0f172a 50%, #020617 100%);
`

export const Wrapper = styled.div<{ $fullPage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  ${({ $fullPage }) =>
    $fullPage &&
    `
      min-height: 100vh;
      width: 100%;
    `}
`

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(148, 163, 184, 0.1);
  border-top-color: #3b82f6;
  border-right-color: #60a5fa;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
`
