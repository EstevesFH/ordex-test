import styled from 'styled-components'

export const PaginationContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(148, 163, 184, 0.1);

  select {
    margin: 0 8px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    font-size: 13px;
    background: rgba(0, 0, 0, 0.2);
    color: #cbd5e1;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    &:hover {
      border-color: rgba(148, 163, 184, 0.3);
    }
  }

  span {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
  }

  > div:last-child {
    display: flex;
    gap: 6px;
  }
`
