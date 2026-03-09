import styled from 'styled-components'

export const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
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

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #fca5a5;
  font-size: 16px;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  font-size: 16px;
`

export const TruncatedText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
  &::after {
    content: '';
  }
`

export const TableWrapper = styled.div`
  max-height: 400px;
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
    //background: rgba(15, 23, 42, 0.9);
    //backdrop-filter: blur(12px);

    &:nth-child(6) {
      max-width: 200px;
    }
  }

  td {
    padding: 12px 8px;
    font-size: 14px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);

    &:nth-child(6) {
      max-width: 200px;
    }
  }
`

export const Status = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid;

  background: ${({ status }) =>
    status === 'Aberto'
      ? 'rgba(239, 68, 68, 0.1)'
      : status === 'Em Andamento'
      ? 'rgba(37, 99, 235, 0.1)'
      : status === 'Aguardando'
      ? 'rgba(245, 158, 11, 0.1)'
      : 'rgba(16, 185, 129, 0.1)'};

  border-color: ${({ status }) =>
    status === 'Aberto'
      ? 'rgba(239, 68, 68, 0.3)'
      : status === 'Em Andamento'
      ? 'rgba(37, 99, 235, 0.3)'
      : status === 'Aguardando'
      ? 'rgba(245, 158, 11, 0.3)'
      : 'rgba(16, 185, 129, 0.3)'};

  color: ${({ status }) =>
    status === 'Aberto'
      ? '#fca5a5'
      : status === 'Em Andamento'
      ? '#60a5fa'
      : status === 'Aguardando'
      ? '#fbbf24'
      : '#6ee7b7'};
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
    color: #94a3b8;
    padding: 4px;
    transition: all 0.2s ease;

    &:hover {
      color: #60a5fa;
      transform: scale(1.1);
    }
  }
`