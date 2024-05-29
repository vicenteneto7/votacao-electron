import { ipcRenderer } from 'electron'
import { IPC } from '../../../../../shared/constants'

export function whenCandidatesWindowClose(fn) {
  const channel = IPC.WINDOWS.CANDIDATES.WHEN_WINDOW_CLOSE

  ipcRenderer.on(channel, (_, ...args) => {
    fn(...args)
  })
}
