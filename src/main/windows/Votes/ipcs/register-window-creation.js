import { ipcMain } from 'electron'
import { IPC } from '../../../../../shared/constants'
import { registerWindowCreationByIPC } from '../../../factories'
import { VotesWindow } from '..'

import '../../../ipc'

export function registerDocumentsWindowCreationByIPC() {
  registerWindowCreationByIPC({
    channel: IPC.WINDOWS.VOTES.CREATE_WINDOW,
    window: VotesWindow,

    callback(window, { sender }) {
      const channel = IPC.WINDOWS.VOTES.WHEN_WINDOW_CLOSE

      ipcMain.removeHandler(channel)

      window.on('closed', () =>
        sender.send(channel, {
          message: 'About window closed!',
        })
      )
    },
  })
}
