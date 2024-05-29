import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WindowStoreProvider } from './store/votes'
import { WindowStoreProvider2 } from './store/candidates'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowStoreProvider>
      <WindowStoreProvider2>
        <App />
      </WindowStoreProvider2>
    </WindowStoreProvider>
  </React.StrictMode>
)
