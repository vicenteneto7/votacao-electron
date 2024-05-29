import { ipcRenderer } from 'electron'
import { IPC } from '../../../../../shared/constants'

export function createCandidatesWindow() {
  const channel = IPC.WINDOWS.CANDIDATES.CREATE_WINDOW

  ipcRenderer.invoke(channel)
}
