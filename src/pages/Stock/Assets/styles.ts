import styled from 'styled-components'
//import { designSystem as ds } from '@/styles/designSystem'


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