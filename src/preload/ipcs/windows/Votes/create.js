import { ipcRenderer } from 'electron'
import { IPC } from '../../../../../shared/constants'

export function createVotesWindow() {
  const channel = IPC.WINDOWS.VOTES.CREATE_WINDOW

  ipcRenderer.invoke(channel)
}
