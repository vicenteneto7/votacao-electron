import { app } from 'electron'

export function makeAppWithSingleInstanceLock(fn) {
  const isPrimaryInstance = app.requestSingleInstanceLock()

  !isPrimaryInstance ? app.quit() : fn()
}
