import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;

  margin: -32px;
  position: relative;
`

export const Content = styled.main`
  flex: 1;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  padding: 32px;

  margin-left: -40px;
  border-radius: 24px 0 0 24px;

  position: relative;
  z-index: 200;

  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
`