import styled from 'styled-components'
import { designSystem as ds } from '../../../styles/designSystem'

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${ds.spacing.lg};
  padding-bottom: ${ds.spacing.md};
  border-bottom: 1px solid ${ds.colors.border};

  h2 {
    font-size: ${ds.typography.size.xl};
    font-weight: ${ds.typography.weight.bold};
    color: ${ds.colors.textMain};
    margin: 0;
  }
`

export const CloseButton = styled.button`
  background: transparent;
  border: 1px solid ${ds.colors.border};
  color: ${ds.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${ds.radius.md};

  &:hover {
    background: ${ds.colors.surfaceHover};
    color: ${ds.colors.textMain};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.lg};
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.md};
`

export const SectionTitle = styled.h3`
  font-size: ${ds.typography.size.base};
  font-weight: ${ds.typography.weight.semibold};
  color: ${ds.colors.textMain};
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid ${ds.colors.border};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${ds.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${ds.typography.size.sm};
    font-weight: ${ds.typography.weight.semibold};
    color: ${ds.colors.textSecondary};
  }

  input,
  select,
  textarea {
    padding: 10px 12px;
    border-radius: ${ds.radius.md};
    border: 1px solid ${ds.colors.border};
    font-size: ${ds.typography.size.base};
    font-family: inherit;
    color: ${ds.colors.textMain};

    &:focus {
      outline: none;
      border-color: ${ds.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`

export const Hint = styled.span`
  font-size: 11px;
  color: ${ds.colors.textSecondary};
  font-style: italic;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${ds.spacing.sm};
  padding-top: ${ds.spacing.md};
  border-top: 1px solid ${ds.colors.border};
`
