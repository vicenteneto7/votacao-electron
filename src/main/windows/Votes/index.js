import { createWindow } from '../../factories'

import { join } from 'path'

import { displayName } from '../../../../package.json'



export * from './ipcs'

export function VotesWindow() {
  const window = createWindow({
    id: 'votes',
    title: `${displayName} - Votes`,
    width: 700,
    height: 500,
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
