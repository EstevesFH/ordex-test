import styled from 'styled-components'
import { designSystem as ds } from '@/styles/designSystem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ds.spacing.xl};
`

export const LoaderWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${ds.spacing.md};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

export const StatusCard = styled.div`
  background: ${ds.colors.surface};
  border: 1px solid ${ds.colors.border};
  border-radius: ${ds.radius.lg};
  padding: ${ds.spacing.lg};
  box-shadow: 0 2px 10px rgba(2, 6, 23, 0.05);

  span {
    font-size: 0.875rem;
    color: ${ds.colors.textSecondary};
  }

  strong {
    display: block;
    margin-top: 8px;
    font-size: 1.75rem;
    color: ${ds.colors.textMain};
    font-weight: 700;
  }
`

export const Alert = styled.div`
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: ${ds.radius.md};
  padding: ${ds.spacing.md};
  color: ${ds.colors.error};
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
