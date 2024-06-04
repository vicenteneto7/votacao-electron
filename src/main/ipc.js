import { ipcMain, session } from "electron";
import db from "../renderer/src/models/DBManager";
import bcrypt from 'bcrypt'

ipcMain.handle('registerEleitor', async (_, eleitorData) => {
  const { nome, email, senha } = eleitorData;

  // Criptografar a senha antes de armazenar
  const hashedPassword = await bcrypt.hash(senha, 10);

  const query = `
    INSERT INTO Eleitor (nome, email, senha)
    VALUES (:nome, :email, :senha)
  `;
  const stmt = db.prepare(query);

  try {
    const result = stmt.run({ nome, email, senha: hashedPassword });
    return { success: true, message: 'Usuário registrado com sucesso!', eleitorId: result.lastInsertRowid };
  } catch (error) {
    return { success: false, message: 'Erro ao registrar usuário: ' + error.message };
  }
});

ipcMain.handle('loginEleitor', async (_, credentials) => {
  const { email, senha } = credentials;

  const query = `
      SELECT * FROM Eleitor WHERE email = :email
    `;
  const stmt = db.prepare(query);

  const eleitor = stmt.get({ email });

  if (eleitor) {
    // Comparar a senha fornecida com a senha armazenada no banco de dados

    const isPasswordValid = await bcrypt.compare(senha, eleitor.senha);
    if (isPasswordValid) {
      return { success: true, message: 'Login bem-sucedido!', userId: eleitor.id_eleitor, nome: eleitor.nome };
    } else {
      return { success: false, message: 'Senha incorreta.' };
    }
  } else {
    return { success: false, message: 'Usuário não encontrado.' };
  }
});

ipcMain.handle('vote', async (event, { id_eleitor, id_candidato }) => {
  const checkQuery = `SELECT * FROM Voto WHERE id_eleitor = :id_eleitor`;
  const checkStmt = db.prepare(checkQuery);

  // Verificar se o eleitor já votou
  const existingVote = checkStmt.get({ id_eleitor });

  if (existingVote) {
    return { success: false, message: 'Eleitor já votou.' };
  }

  const insertQuery = `
      INSERT INTO Voto (id_eleitor, id_candidato)
      VALUES (:id_eleitor, :id_candidato)
    `;
  const insertStmt = db.prepare(insertQuery);

  try {
    const result = insertStmt.run({ id_eleitor, id_candidato });
    return { success: true, message: 'Voto registrado com sucesso!' };
  } catch (error) {
    return { success: false, message: 'Erro ao registrar voto: ' + error.message };
  }
});

ipcMain.handle('getVoterVotes', async (event, { id_eleitor }) => {
  const query = `
    SELECT Candidato.nome, Candidato.partido
    FROM Voto
    JOIN Candidato ON Voto.id_candidato = Candidato.id_candidato
    WHERE Voto.id_eleitor = :id_eleitor
  `;
  const stmt = db.prepare(query);

  try {
    const votes = stmt.all({ id_eleitor });
    if (votes.length > 0) {
      return { success: true, votes: votes };
    } else {
      return { success: false, message: 'Eleitor não votou ainda.' };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao buscar votos: ' + error.message };
  }
});

ipcMain.handle('getAllVoterVotes', async () => {
  const query = `
      SELECT Eleitor.nome AS eleitor_nome, Eleitor.email, Candidato.nome AS candidato_nome, Candidato.partido
      FROM Voto
      JOIN Eleitor ON Voto.id_eleitor = Eleitor.id_eleitor
      JOIN Candidato ON Voto.id_candidato = Candidato.id_candidato
    `;
  const stmt = db.prepare(query);

  try {
    const votes = stmt.all();
    if (votes.length > 0) {
      return { success: true, votes: votes };
    } else {
      return { success: false, message: 'Nenhum voto encontrado.' };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao buscar votos: ' + error.message };
  }
});



