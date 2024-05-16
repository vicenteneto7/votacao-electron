import { ipcMain } from 'electron'

export function registerWindowCreationByIPC({
  channel,
  callback,
  window: createWindow,
}) {
  let window

  ipcMain.handle(channel, (event) => {
    if (!createWindow || window) return

    window = createWindow()

    window.on('closed', () => (window = null))

    callback && callback(window, event)
  })
}
