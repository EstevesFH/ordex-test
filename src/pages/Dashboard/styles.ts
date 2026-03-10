import styled from 'styled-components'
import { designSystem } from '@/styles/designSystem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designSystem.spacing.xl};
`

export const Header = styled.div`
  h1 {
    margin: 0;
    font-size: 2rem;
    color: ${designSystem.colors.textMain};
  }

  p {
    margin: 8px 0 0;
    color: ${designSystem.colors.textSecondary};
  }
`

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${designSystem.spacing.md};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

export const StatusCard = styled.div`
  background: ${designSystem.colors.surface};
  border: 1px solid ${designSystem.colors.border};
  border-radius: ${designSystem.radius.lg};
  padding: ${designSystem.spacing.lg};
  box-shadow: 0 2px 10px rgba(2, 6, 23, 0.05);

  span {
    font-size: 0.875rem;
    color: ${designSystem.colors.textSecondary};
  }

  strong {
    display: block;
    margin-top: 8px;
    font-size: 1.75rem;
    color: ${designSystem.colors.textMain};
    font-weight: 700;
  }
`

export const Alert = styled.div`
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: ${designSystem.radius.md};
  padding: ${designSystem.spacing.md};
  color: #9a3412;
`

export const TableCard = styled.div`
  background: ${designSystem.colors.surface};
  border: 1px solid ${designSystem.colors.border};
  border-radius: ${designSystem.radius.lg};
  padding: ${designSystem.spacing.lg};

  h2 {
    margin: 0 0 ${designSystem.spacing.md};
    color: ${designSystem.colors.textMain};
    font-size: 1.125rem;
  }
`

export const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid ${designSystem.colors.border};
    font-size: 0.9rem;
  }

  th {
    color: ${designSystem.colors.textSecondary};
    font-weight: 600;
  }

  td {
    color: ${designSystem.colors.textMain};
  }
`

const getBadgeBackground = (status: string) => {
  if (status === 'Aberto') return '#fef2f2';
  if (status === 'Em Andamento') return '#eff6ff';
  if (status === 'Aguardando') return '#fffbeb';
  return '#ecfdf5';
};

const getBadgeColor = (status: string) => {
  if (status === 'Aberto') return '#b91c1c';
  if (status === 'Em Andamento') return '#1d4ed8';
  if (status === 'Aguardando') return '#b45309';
  return '#047857';
};

const getBadgeBorder = (status: string) => {
  if (status === 'Aberto') return '#fecaca';
  if (status === 'Em Andamento') return '#bfdbfe';
  if (status === 'Aguardando') return '#fde68a';
  return '#a7f3d0';
};

export const Badge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;

  background: ${({ status }) => getBadgeBackground(status)};

  color: ${({ status }) => getBadgeColor(status)};

  border: 1px solid ${({ status }) => getBadgeBorder(status)};
`
