import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Alpine from 'alpinejs';

// Jadikan Alpine tersedia secara global
window.Alpine = Alpine;

// Mulai Alpine
Alpine.start();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
