import { contextBridge, ipcRenderer } from 'electron'

import * as ipcs from './ipcs'


// Custom APIs for renderer
const api = {
  ...ipcs,

  username: process.env.USER,

  registerEleitor(req) {
    return ipcRenderer.invoke('registerEleitor', req)
  },
  loginEleitor(req) {
    return ipcRenderer.invoke('loginEleitor', req)
  },
  vote(req) {
    return ipcRenderer.invoke('vote', req)
  },
  getCandidatos() {
    return ipcRenderer.invoke('getCandidatos')
  },
  getAllVoterVotes() {
    return ipcRenderer.invoke('getAllVoterVotes')
  },
  countVotesPerCandidate() {
    return ipcRenderer.invoke('countVotesPerCandidate')
  },
  uploadImage(file) {
    return ipcRenderer.invoke('uploadImage', file)
  },
  addCandidato(req) {
    return ipcRenderer.invoke('addCandidato', req)
  },
  editCandidato(req) {
    return ipcRenderer.invoke('editCandidato', req)
  },
  deleteCandidato(id) {
    return ipcRenderer.invoke('deleteCandidato', id)
  },
  getVoterVotes(id) {
    return ipcRenderer.invoke('getVoterVotes', id)
  }
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
