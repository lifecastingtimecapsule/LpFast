import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// ★以下の1行を追加してください
import './index.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)