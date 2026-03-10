import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GlobalStyle } from './styles/global'

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}
