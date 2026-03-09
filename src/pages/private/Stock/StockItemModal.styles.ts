import styled from 'styled-components'

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(148, 163, 184, 0.2);

  h2 {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #f1f5f9;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
  }

  input,
  select,
  textarea {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
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
  color: #64748b;
  font-style: italic;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  margin-top: 8px;
`
