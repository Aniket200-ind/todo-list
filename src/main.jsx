import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider>
    <App />
    <Toaster richColors position="bottom-right" />
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
