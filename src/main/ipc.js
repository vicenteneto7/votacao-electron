import { app, ipcMain, protocol } from 'electron'
import db from '../renderer/src/models/DBManager'
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'

// Registrar protocolo personalizado 'app'
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

// Função para carregar recursos locais com protocolo 'app'
function loadLocalResource(filePath) {
  return `app://./${filePath}`;
}

// Diretório de uploads
const uploadPath = path.resolve(app.getPath('userData'), 'uploads');

// Certifique-se de que o diretório de uploads existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Manipulador IPC para adicionar candidato
ipcMain.handle('addCandidato', async (event, candidatoData) => {
  const { nome, partido, file } = candidatoData;

  const query = `
    INSERT INTO Candidato (nome, partido, imagem)
    VALUES (?, ?, ?)
  `;
  const stmt = db.prepare(query);

  try {
    if (!file || !file.data || !file.name) {
      throw new Error('Arquivo inválido');
    }

    // Gerar nome único para o arquivo
    const uniqueFileName = Date.now() + '_' + file.name;
    const imagePath = path.join(uploadPath, uniqueFileName);

    // Salvar arquivo no diretório de uploads
    fs.writeFileSync(imagePath, Buffer.from(file.data, 'base64'));

    const result = stmt.run(nome, partido, imagePath);

    return { success: true, candidato: { id: result.lastInsertRowid, nome, partido, imagem: imagePath } };
  } catch (error) {
    console.error('Erro ao adicionar candidato:', error.message);
    return { success: false, message: 'Erro ao adicionar candidato: ' + error.message };
  }
});

ipcMain.handle('registerEleitor', async (_, eleitorData) => {
  const { nome, email, senha } = eleitorData

  // Criptografar a senha antes de armazenar
  const hashedPassword = await bcrypt.hash(senha, 10)

  const query = `
    INSERT INTO Eleitor (nome, email, senha)
    VALUES (:nome, :email, :senha)
  `
  const stmt = db.prepare(query)

  try {
    const result = stmt.run({ nome, email, senha: hashedPassword })
    return {
      success: true,
      message: 'Usuário registrado com sucesso!',
      eleitorId: result.lastInsertRowid
    }
  } catch (error) {
    return { success: false, message: 'Erro ao registrar usuário: ' + error.message }
  }
})

ipcMain.handle('loginEleitor', async (_, credentials) => {
  const { email, senha } = credentials

  const query = `
      SELECT * FROM Eleitor WHERE email = :email
    `
  const stmt = db.prepare(query)

  const eleitor = stmt.get({ email })

  if (eleitor) {
    // Comparar a senha fornecida com a senha armazenada no banco de dados

    const isPasswordValid = await bcrypt.compare(senha, eleitor.senha)
    if (isPasswordValid) {
      return {
        success: true,
        message: 'Login bem-sucedido!',
        admin: Boolean(eleitor.admin),
        eleitorId: eleitor.id_eleitor,
        nome: eleitor.nome
      }
    } else {
      return { success: false, message: 'Senha incorreta.' }
    }
  } else {
    return { success: false, message: 'Usuário não encontrado.' }
  }
})

ipcMain.handle('vote', async (event, { id_eleitor, id_candidato }) => {
  if (!id_eleitor || !id_candidato) {
    return { success: false, message: 'IDs de eleitor ou candidato são nuloskk.' }
  }

  const checkQuery = `SELECT * FROM Voto WHERE id_eleitor = :id_eleitor`
  const checkStmt = db.prepare(checkQuery)

  // Verificar se o eleitor já votou
  const existingVote = checkStmt.get({ id_eleitor })

  if (existingVote) {
    return { success: false, message: 'Eleitor já votou.' }
  }

  const insertQuery = `
      INSERT INTO Voto (id_eleitor, id_candidato)
      VALUES (:id_eleitor, :id_candidato)
    `
  const insertStmt = db.prepare(insertQuery)

  try {
    insertStmt.run({ id_eleitor, id_candidato })
    return { success: true, message: 'Voto registrado com sucesso!' }
  } catch (error) {
    return { success: false, message: 'Erro ao registrar voto: ' + error.message }
  }
})

ipcMain.handle('getCandidatos', async () => {
  const query = `SELECT * FROM Candidato`
  const stmt = db.prepare(query)

  try {
    const candidatos = stmt.all()
    if (candidatos.length > 0) {
      return { success: true, candidatos: candidatos }
    } else {
      return { success: false, message: 'Nenhum candidato encontrado.' }
    }
  } catch (error) {
    return { success: false, message: 'Erro ao buscar candidatos: ' + error.message }
  }
})

ipcMain.handle('getVoterVotes', async (_, { id_eleitor }) => {
  const query = `
    SELECT Candidato.nome, Candidato.partido
    FROM Voto
    JOIN Candidato ON Voto.id_candidato = Candidato.id_candidato
    WHERE Voto.id_eleitor = :id_eleitor
  `
  const stmt = db.prepare(query)

  try {
    const votes = stmt.all({ id_eleitor })
    if (votes.length > 0) {
      return { success: true, votes: votes }
    } else {
      return { success: false, message: 'Eleitor não votou ainda.' }
    }
  } catch (error) {
    return { success: false, message: 'Erro ao buscar votos: ' + error.message }
  }
})

ipcMain.handle('getAllVoterVotes', async () => {
  const query = `
      SELECT Eleitor.nome AS eleitor_nome, Eleitor.email, Candidato.nome AS candidato_nome, Candidato.partido
      FROM Voto
      JOIN Eleitor ON Voto.id_eleitor = Eleitor.id_eleitor
      JOIN Candidato ON Voto.id_candidato = Candidato.id_candidato
    `
  const stmt = db.prepare(query)

  try {
    const votes = stmt.all()
    if (votes.length > 0) {
      return { success: true, votes: votes }
    } else {
      return { success: false, message: 'Nenhum voto encontrado.' }
    }
  } catch (error) {
    return { success: false, message: 'Erro ao buscar votos: ' + error.message }
  }
})

ipcMain.handle('countVotesPerCandidate', async () => {
  const query = `
    SELECT Candidato.id_candidato, Candidato.nome AS candidato_nome, Candidato.partido,
          COALESCE(COUNT(Voto.id_candidato), 0) AS total_votos
    FROM Candidato
    LEFT JOIN Voto ON Candidato.id_candidato = Voto.id_candidato
    GROUP BY Candidato.id_candidato
  `
  const stmt = db.prepare(query)

  try {
    const results = stmt.all()
    if (results.length > 0) {
      return { success: true, results: results }
    } else {
      return { success: false, message: 'Nenhum voto encontrado.' }
    }
  } catch (error) {
    return { success: false, message: 'Erro ao contar votos: ' + error.message }
  }
})
