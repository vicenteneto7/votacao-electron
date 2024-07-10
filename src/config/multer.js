import { app } from 'electron';

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.resolve(app.getPath('userData'), 'uploads');

// Certifique-se de que o diretório de upload existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Verificar se o diretório de uploads existe, se não, criar o diretório
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configuração do armazenamento com Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Inicialização do Multer com a configuração de armazenamento
export const upload = multer({ storage });

