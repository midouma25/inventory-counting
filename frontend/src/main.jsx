import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'

// 🔴 1. استيراد دالة تفعيل جسر الشبكة (Network API)
import { setupNetworkApi } from './networkApi' 



setupNetworkApi();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)