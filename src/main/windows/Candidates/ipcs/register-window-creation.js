import { ipcMain } from 'electron'
import { IPC } from '../../../../../shared/constants'
import { registerWindowCreationByIPC } from '../../../factories'
import { CandidatesWindow } from '..'

import '../../../ipc'

export function registerCandidatesWindowCreationByIPC() {
  registerWindowCreationByIPC({
    channel: IPC.WINDOWS.CANDIDATES.CREATE_WINDOW,
    window: CandidatesWindow,

    callback(window, { sender }) {
      const channel = IPC.WINDOWS.CANDIDATES.WHEN_WINDOW_CLOSE

      ipcMain.removeHandler(channel)

      window.on('closed', () =>
        sender.send(channel, {
          message: 'About window closed!',
        })
      )
    },
  })
}
