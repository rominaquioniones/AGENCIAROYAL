import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Configuración global para WhatsApp
window.WHATSAPP_CONFIG = {
  NUMBER: '2236751421',
  MESSAGE: 'Quiero mi bono del 30% y jugar♥',
  URL: 'https://wa.me/5492236751421?text=Quiero%20mi%20bono%20del%2030%25%20y%20jugar%E2%99%A5'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)