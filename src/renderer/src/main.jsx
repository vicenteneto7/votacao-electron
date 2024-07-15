import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WindowStoreProvider } from './store/votes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowStoreProvider>
      <App />
    </WindowStoreProvider>
  </React.StrictMode>
)
