import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.5px;
    
    background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

export const Alert = styled.div`
  background: rgba(245, 158, 11, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-left: 4px solid #f59e0b;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);

  strong {
    color: #fbbf24;
    font-size: 16px;
    display: block;
  }

  p {
    margin: 4px 0 0 0;
    color: #fcd34d;
    font-size: 14px;
  }
`

export const AlertIcon = styled.div`
  color: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

export const LowStockBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fbbf24;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
`

export const TableCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`

export const TableHeader = styled.div`
  margin-bottom: 16px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #f1f5f9;
  }
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  font-size: 16px;
`

export const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 13px;
    color: #ffffff;
    font-weight: 600;
    padding-bottom: 12px;
    position: sticky;
    top: 0;
    //background: rgba(15, 23, 42, 0.9);
    //backdrop-filter: blur(12px);
    z-index: 1;
  }

  td {
    font-size: 14px;
    color: #cbd5e1;
    padding: 16px 8px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);

    strong {
      color: #f1f5f9;
      font-weight: 600;
    }
  }

  tbody tr {
    transition: background 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.02);
    }
  }
`

interface QuantityCellProps {
  critical: boolean
}

export const QuantityCell = styled.div<QuantityCellProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${props => (props.critical ? 700 : 500)};
  color: ${props => (props.critical ? '#fca5a5' : '#cbd5e1')};

  svg {
    color: #fbbf24;
  }
`

interface StatusBadgeProps {
  status: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponível':
      return { bg: 'rgba(16, 185, 129, 0.1)', color: '#6ee7b7', border: 'rgba(16, 185, 129, 0.3)' }
    case 'Reservado':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' }
    case 'Indisponível':
      return { bg: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: 'rgba(239, 68, 68, 0.3)' }
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' }
  }
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => getStatusColor(props.status).bg};
  color: ${props => getStatusColor(props.status).color};
  border: 1px solid ${props => getStatusColor(props.status).border};
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #60a5fa;
  }
`
