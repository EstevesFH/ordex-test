import styled from 'styled-components'

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

export const ItemName = styled.p`
  font-size: 14px;
  color: #cbd5e1;
  margin: 4px 0 0 0;
  font-weight: 500;
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

export const CurrentStock = styled.div`
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
`

export const StockLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`

interface StockValueProps {
  critical: boolean
}

export const StockValue = styled.div<StockValueProps>`
  font-size: 32px;
  font-weight: 700;
  color: ${props => (props.critical ? '#f87171' : '#f1f5f9')};
  margin-bottom: 8px;
`

export const CriticalBadge = styled.div`
  display: inline-block;
  background: rgba(245, 158, 11, 0.1);
  color: #fcd34d;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(245, 158, 11, 0.3);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

interface TypeButtonProps {
  active: boolean
  color: 'green' | 'red' | 'blue'
}

const getTypeButtonColor = (color: string, active: boolean) => {
  if (!active) {
    return {
      bg: 'rgba(255, 255, 255, 0.03)',
      border: 'rgba(148, 163, 184, 0.2)',
      text: '#94a3b8',
    }
  }

  switch (color) {
    case 'green':
      return {
        bg: 'rgba(34, 197, 94, 0.1)',
        border: '#22c55e',
        text: '#86efac',
      }
    case 'red':
      return {
        bg: 'rgba(239, 68, 68, 0.1)',
        border: '#ef4444',
        text: '#fca5a5',
      }
    case 'blue':
      return {
        bg: 'rgba(59, 130, 246, 0.1)',
        border: '#3b82f6',
        text: '#93c5fd',
      }
    default:
      return {
        bg: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(148, 163, 184, 0.2)',
        text: '#94a3b8',
      }
  }
}

export const TypeButton = styled.button<TypeButtonProps>`
  background: ${props => getTypeButtonColor(props.color, props.active).bg};
  border: 2px solid ${props => getTypeButtonColor(props.color, props.active).border};
  color: ${props => getTypeButtonColor(props.color, props.active).text};
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;

  svg {
    color: ${props => getTypeButtonColor(props.color, props.active).text};
  }

  strong {
    font-size: 14px;
    font-weight: 700;
    display: block;
  }

  span {
    font-size: 11px;
    display: block;
    margin-top: 2px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
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
  textarea {
    padding: 12px;
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

export const Preview = styled.div`
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
`

export const PreviewLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
`

interface PreviewValueProps {
  critical: boolean
}

export const PreviewValue = styled.div<PreviewValueProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => (props.critical ? '#f87171' : '#f1f5f9')};
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  margin-top: 8px;
`
