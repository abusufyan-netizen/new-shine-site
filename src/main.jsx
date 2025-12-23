import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css' // Ensure App.css is also imported here if not in App.jsx
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)