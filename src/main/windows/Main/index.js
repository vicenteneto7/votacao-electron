import { BrowserWindow, app } from 'electron'
import { join } from 'path'
import { createWindow } from '../../factories'
import { ENVIRONMENT } from '../../../../shared/constants'
import { displayName } from '../../../../package.json'
import { Server } from 'socket.io'
import { getCandidatos, handleLogin, handleVote } from '../../WebSockets'

let mainWindow = null

// Função para iniciar o servidor Socket.io
function startSocketServer() {
  const io = new Server(8082, {
    cors: {
      origin: '*' // Permite conexões de qualquer origem
    }
  })

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id)

    socket.on('loginEleitor', (credentials) => {
      handleLogin(socket, credentials)
    })

    socket.on('getCandidatos', () => {
      getCandidatos(socket)
    })

    socket.on('vote', (credentials) => {
      handleVote(socket, credentials)
    })



    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id)
    })
  })

  console.log('Servidor Socket.io iniciado na porta 8082')
}

// Função para criar a janela principal
export async function MainWindow() {
  if (mainWindow) {
    return mainWindow // Retorna a janela existente se já estiver criada
  }

  mainWindow = createWindow({
    id: 'main',
    title: displayName,
    width: 800,
    height: 600,
    show: false,
    center: true,
    movable: true,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
    mainWindow.show()
  })

  mainWindow.on('close', () => {
    mainWindow = null // Limpa a referência da janela ao fechar
  })

  return mainWindow
}

// Inicializa a aplicação Electron e o servidor Socket.io
app.whenReady().then(() => {
  startSocketServer()
  MainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    MainWindow()
  }
})
