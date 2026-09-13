import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/animations.css'
import './styles/layout.css'
import './styles/common.css'
import './styles/home.css'
import './styles/moments.css'
import './styles/about.css'
import './styles/bubble-pool.css'
import './styles/detail.css'
import './styles/responsive.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
