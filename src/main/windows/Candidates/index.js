import { createWindow } from '../../factories'

import { join } from 'path'

import { displayName } from '../../../../package.json'

export * from './ipcs'

export function CandidatesWindow() {
  const window = createWindow({
    id: 'candidates',
    title: `${displayName} - Candidates`,
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
