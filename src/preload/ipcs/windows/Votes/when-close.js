import { ipcRenderer } from 'electron'
import { IPC } from '../../../../../shared/constants'

export function whenVotesWindowClose(fn) {
  const channel = IPC.WINDOWS.VOTES.WHEN_WINDOW_CLOSE

  ipcRenderer.on(channel, (_, ...args) => {
    fn(...args)
  })
}
