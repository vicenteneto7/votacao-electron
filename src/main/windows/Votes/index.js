import { createWindow } from '../../factories'

import { join } from 'path'


export * from './ipcs'

export function VotesWindow() {
  const window = createWindow({
    id: 'votes',
    title: 'Votes',
    width: 600,
    height: 400,
    show: false,
    resizable: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,

    webPreferences: {
      sandbox: false,
      preload: join(__dirname, '../preload/index.js'),
    },  
  })

  window.webContents.on('did-finish-load', () => window.show())

  return window
}
