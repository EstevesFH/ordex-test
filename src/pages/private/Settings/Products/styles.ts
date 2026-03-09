import styled from 'styled-components'

export const Container = styled.div`
  padding: 24px;
`

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
  min-height: 150px;
`

export const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;

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
  }

  td {
    padding: 12px 8px;
    font-size: 14px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }
`

export const Status = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid;
  background: ${({ status }) =>
    status === 'Ativo' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border-color: ${({ status }) =>
    status === 'Ativo' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
  color: ${({ status }) =>
    status === 'Ativo' ? '#6ee7b7' : '#fca5a5'};
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
    transition: all 0.2s ease;

    &:hover {
      color: #2563eb;
    }
  }
`

export const NoData = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #64748b;
`
