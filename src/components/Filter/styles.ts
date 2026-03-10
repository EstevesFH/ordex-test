import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${ds.spacing.lg};
`

export const Modal = styled.div`
  background: ${ds.colors.backgroundCard};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${ds.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
  box-shadow: 0 16px 40px rgba(2, 6, 23, 0.18);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: ${ds.typography.size.lg};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
  }
`

export const CloseButton = styled.button`
  border: 1px solid ${ds.colors.border};
  background: ${ds.colors.surface};
  color: ${ds.colors.textSecondary};
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: ${ds.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${ds.transitions.fast};

  &:hover {
    background: ${ds.colors.surfaceHover};
    color: ${ds.colors.textMain};
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textMain};
  }

  input,
  select {
    padding: 10px 12px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.sm};
    width: 100%;
    color: ${ds.colors.textMain};
    background: ${ds.colors.surface};
    transition: ${ds.transitions.fast};

    &::placeholder {
      color: ${ds.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
    }
  }

  select {
    cursor: pointer;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.sm};
  margin-top: ${ds.spacing.xs};
`
