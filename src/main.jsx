import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BalanceProvider } from './context/BalanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BalanceProvider>
    <App />
    </BalanceProvider>
  </StrictMode>,
)
