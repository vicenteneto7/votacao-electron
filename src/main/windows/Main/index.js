import { BrowserWindow, protocol } from 'electron'
import { join } from 'path'
import { createWindow } from '../../factories'
import { ENVIRONMENT } from '../../../../shared/constants'

import { displayName } from '../../../../package.json'


export async function MainWindow() {

  const window = createWindow({
    id: 'main',
    title: displayName,
    width: 800,
    height: 600,
    show: false,
    center: true,
    movable: true,
    resizable: true,
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  window.on('close', () =>
    BrowserWindow.getAllWindows().forEach((window) => window.destroy())
  )

  return window
}
