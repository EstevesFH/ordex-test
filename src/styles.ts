import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);

  margin-left: -35px;
  border-radius: 32px 0 0 32px;

  padding: 40px; 
  z-index: 300;
  position: relative;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

export const Content = styled.div`
  margin: 0 auto;
`;
