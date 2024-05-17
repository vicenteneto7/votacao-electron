import { app } from 'electron'

//import './ipc' - aqui se importa a api -

import { makeAppSetup, makeAppWithSingleInstanceLock } from './factories'
import { MainWindow, registerDocumentsWindowCreationByIPC } from './windows'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(MainWindow)

  registerDocumentsWindowCreationByIPC()
})
