import { contextBridge } from 'electron'

import * as ipcs from './ipcs'


// Custom APIs for renderer
const api = {
  ...ipcs,

  username: process.env.USER,
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

//preload-expoe ao processo renderer as apis, possiveis comunic entre main e renderer, ent elas tem q ser delcaradas no preload
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
