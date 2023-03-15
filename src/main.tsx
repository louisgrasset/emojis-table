import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

// Handle storage init
const DEFAULT_HISTORY = ["🔥", "🌸", "🌱", "🍣", "🍋", "🐔"];
chrome.storage.sync.get(['history']).then(data => {
    if(!data.history || data.history.length !== 6) {
        void chrome.storage.sync.set({history: DEFAULT_HISTORY})
    }
})

// React app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
