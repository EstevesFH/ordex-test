import { createGlobalStyle } from 'styled-components'
import { designSystem as ds } from './designSystem'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${ds.typography.fontFamily};
    background: ${ds.colors.background};
    color: ${ds.colors.textMain};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${ds.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 5px;

    &:hover {
      background: #94a3b8;
    }
  }
`
