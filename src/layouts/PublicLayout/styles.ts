import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%; /* Troque 100vw por 100% para evitar scroll bugs */
  display: flex;
  flex-direction: column; /* Garante que o Outlet flua corretamente */
`;

/*export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(ellipse at top left, #1e3a8a 0%, #0f172a 50%, #020617 100%);
  background-attachment: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
`*/