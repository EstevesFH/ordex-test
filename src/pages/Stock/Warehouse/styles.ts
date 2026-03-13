import styled from 'styled-components'

export const Alert = styled.div`
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.18);
  border-left: 4px solid #f59e0b;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  strong {
    color: #fcd34d;
    display: block;
  }

  p {
    margin: 4px 0 0;
    color: #fbbf24;
    font-size: 14px;
  }
`

export const AlertIcon = styled.div`
  font-size: 20px;
  display: flex;
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
    margin: 0;
    font-size: 18px;
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
  max-height: 520px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.2);
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
    padding: 10px 8px;
    position: sticky;
    top: 0;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(12px);
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

export const QuantityCell = styled.div<{ $critical: boolean }>`
  font-weight: ${({ $critical }) => ($critical ? 700 : 500)};
  color: ${({ $critical }) => ($critical ? '#fca5a5' : '#cbd5e1')};
`

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponível':
      return { bg: 'rgba(34, 197, 94, 0.1)', color: '#86efac' }
    case 'Reservado':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d' }
    case 'Indisponível':
      return { bg: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1' }
  }
}

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ status }) => getStatusColor(status).bg};
  color: ${({ status }) => getStatusColor(status).color};
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
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