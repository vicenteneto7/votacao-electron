import { BrowserWindow } from 'electron'
import { join } from 'path'
import { createWindow } from '../../factories'
import { ENVIRONMENT } from '../../../../shared/constants'


export async function MainWindow() {
  const window = createWindow({
    id: 'main',
    title: 'App Documents',
    width: 1100,
    height: 800,
    show: false,
    center: true,
    movable: true,
    resizable: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,

    webPreferences: {
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
