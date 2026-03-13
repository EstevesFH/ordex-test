import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Controls = styled.div`
  display: flex;
    flex-direction: column;
    gap: ${ds.spacing.xl};
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
    margin: 0;
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

    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
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
    padding-bottom: 12px;
    position: sticky;
    top: 0;
    z-index: 1;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(12px);
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

interface CategoryBadgeProps {
  category: 'durable' | 'consumable'
}

export const CategoryBadge = styled.span<CategoryBadgeProps>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props =>
    props.category === 'durable'
      ? 'rgba(59, 130, 246, 0.1)'
      : 'rgba(245, 158, 11, 0.1)'};
  color: ${props =>
    props.category === 'durable' ? '#93c5fd' : '#fcd34d'};
  border: 1px solid
    ${props =>
      props.category === 'durable'
        ? 'rgba(59, 130, 246, 0.3)'
        : 'rgba(245, 158, 11, 0.3)'};
`

interface StatusBadgeProps {
  status: string
}

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

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => getStatusColor(props.status).bg};
  color: ${props => getStatusColor(props.status).color};
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