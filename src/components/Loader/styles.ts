import styled, { keyframes } from 'styled-components'
import { designSystem as ds } from '../../styles/designSystem'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const LoaderContainer = styled.div<{ $fullPage: boolean }>`
  min-height: ${({ $fullPage }) => ($fullPage ? '100vh' : '220px')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`

export const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 4px solid #dbeafe;
  border-top-color: ${ds.colors.primary};
  border-right-color: ${ds.colors.primaryLight};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`
