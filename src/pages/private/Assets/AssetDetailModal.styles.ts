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

export const Subtitle = styled.p`
  font-size: 14px;
  color: #cbd5e1;
  margin: 4px 0 0 0;
`

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 8px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.2);
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InfoLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

interface InfoValueProps {
  highlight?: boolean
}

export const InfoValue = styled.span<InfoValueProps>`
  font-size: 14px;
  color: ${props => props.highlight ? '#f87171' : '#f1f5f9'};
  font-weight: ${props => props.highlight ? 600 : 500};
`

interface StatusBadgeProps {
  status: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ativo':
      return { bg: 'rgba(34, 197, 94, 0.1)', color: '#86efac' }
    case 'Inativo':
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1' }
    case 'Em Manutenção':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d' }
    case 'Descartado':
      return { bg: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1' }
  }
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  background: ${props => getStatusColor(props.status).bg};
  color: ${props => getStatusColor(props.status).color};
  width: fit-content;
`

export const SpecList = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SpecItem = styled.div`
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;

  strong {
    color: #f1f5f9;
    font-weight: 600;
    margin-right: 6px;
  }
`

export const InvoiceCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

export const InvoiceFileName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
`

export const InvoiceLabel = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin: 4px 0 0 0;
`

export const UploadArea = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 2px dashed rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;

  p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }
`

export const FileInput = styled.div`
  input[type='file'] {
    display: none;
  }

  label {
    display: inline-block;
    padding: 10px 20px;
    background: #2f80ed;
    color: white;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #1e6fd1;
    }
  }
`

export const UploadHint = styled.span`
  font-size: 12px;
  color: #94a3b8;
`

export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const TicketCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-left: 4px solid #3b82f6;
`

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

export const TicketId = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #2f80ed;
`

interface TicketBadgeProps {
  status: string
}

const getTicketStatusColor = (status: string) => {
  switch (status) {
    case 'Aberto':
      return { bg: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd' }
    case 'Em Andamento':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d' }
    case 'Aguardando':
      return { bg: 'rgba(236, 72, 153, 0.1)', color: '#f9a8d4' }
    case 'Finalizado':
      return { bg: 'rgba(34, 197, 94, 0.1)', color: '#86efac' }
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1' }
  }
}

export const TicketBadge = styled.span<TicketBadgeProps>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => getTicketStatusColor(props.status).bg};
  color: ${props => getTicketStatusColor(props.status).color};
`

export const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;

  p {
    font-size: 13px;
    color: #cbd5e1;
    margin: 0;
    line-height: 1.5;

    strong {
      color: #f1f5f9;
      font-weight: 600;
    }
  }
`

export const TicketDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 24px;
  color: #94a3b8;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 8px;
`

export const NotesBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;
  white-space: pre-wrap;
`
