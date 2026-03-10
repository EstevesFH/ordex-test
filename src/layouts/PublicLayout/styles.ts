import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%; /* Troque 100vw por 100% para evitar scroll bugs */
  display: flex;
  flex-direction: column; /* Garante que o Outlet flua corretamente */
`;