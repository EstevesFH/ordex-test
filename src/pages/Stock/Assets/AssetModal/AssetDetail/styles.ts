import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 9999;
`

export const Modal = styled.div`
  width: 100%;
  max-width: 980px;
  max-height: 90vh;
  overflow: hidden;
  background: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  padding: 24px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);

  h2 {
    margin: 0;
    color: #f8fafc;
    font-size: 24px;
    font-weight: 700;
  }

  p {
    margin: 6px 0 0;
    color: #94a3b8;
    font-size: 14px;
  }
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #f1f5f9;
  }
`

export const Content = styled.div`
  max-height: calc(90vh - 120px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 8px;
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #f8fafc;
  font-size: 16px;
  font-weight: 600;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  padding: 14px;

  label {
    display: block;
    color: #94a3b8;
    font-size: 12px;
    margin-bottom: 6px;
  }

  strong {
    color: #f8fafc;
    font-size: 14px;
    font-weight: 600;
  }
`

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ativo':
      return { bg: 'rgba(34, 197, 94, 0.1)', color: '#86efac' }
    case 'Em uso':
      return { bg: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd' }
    case 'Em Manutenção':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d' }
    case 'Descartado':
      return { bg: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1' }
  }
}

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => getStatusColor(props.status).bg};
  color: ${props => getStatusColor(props.status).color};
`

export const MetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;

  span {
    color: #94a3b8;
  }

  strong {
    color: #f8fafc;
  }
`

export const NotesBox = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  padding: 16px;
  color: #cbd5e1;
  line-height: 1.6;
  white-space: pre-wrap;
`

export const EmptyState = styled.div`
  padding: 18px;
  text-align: center;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
`

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const HistoryCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  padding: 14px;

  p {
    margin: 8px 0;
    color: #cbd5e1;
  }

  small {
    color: #94a3b8;
  }
`

export const HistoryTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  strong {
    color: #f8fafc;
    text-transform: capitalize;
  }

  span {
    color: #94a3b8;
    font-size: 12px;
  }
`