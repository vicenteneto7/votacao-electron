import bcrypt from 'bcrypt';
import db from '../../renderer/src/models/DBManager'

export async function handleLogin(socket, credentials) {
  const { email, senha } = credentials;

  try {
    const query = `
      SELECT * FROM Eleitor WHERE email = :email
    `;
    const stmt = db.prepare(query);
    const eleitor = stmt.get({ email });

    if (eleitor) {
      const isPasswordValid = await bcrypt.compare(senha, eleitor.senha);
      const response = isPasswordValid
        ? {
          success: true,
          message: 'Login bem-sucedido!',
          admin: Boolean(eleitor.admin),
          eleitorId: eleitor.id_eleitor,
          nome: eleitor.nome,
        }
        : { success: false, message: 'Senha incorreta.' };

      socket.emit('loginResponse', response);
    } else {
      socket.emit('loginResponse', { success: false, message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao processar login:', error);
    socket.emit('loginResponse', { success: false, message: 'Erro no servidor.' });
  }
}

export async function getCandidatos(socket) {
  const query = `SELECT * FROM Candidato`;
  const stmt = db.prepare(query);

  try {
    const candidatos = stmt.all();
    if (candidatos.length > 0) {
      socket.emit('candidatesResponse', { success: true, candidatos });
    } else {
      socket.emit('candidatesResponse', { success: false, message: 'Nenhum candidato encontrado.' });
    }
  } catch (error) {
    socket.emit('candidatesResponse', { success: false, message: 'Erro ao buscar candidatos: ' + error.message });
  }
}

// Adapte a função de votação para o uso de WebSocket
export function handleVote(socket, { id_eleitor, id_candidato }) {
  if (!id_eleitor || !id_candidato) {
    socket.emit('voteResponse', { success: false, message: 'IDs de eleitor ou candidato são nulos.' });
    return;
  }

  const checkQuery = `SELECT * FROM Voto WHERE id_eleitor = :id_eleitor`;
  const checkStmt = db.prepare(checkQuery);

  // Verificar se o eleitor já votou
  const existingVote = checkStmt.get({ id_eleitor });

  if (existingVote) {
    socket.emit('voteResponse', { success: false, message: 'Eleitor já votou.' });
    return;
  }

  const insertQuery = `
      INSERT INTO Voto (id_eleitor, id_candidato)
      VALUES (:id_eleitor, :id_candidato)
  `;
  const insertStmt = db.prepare(insertQuery);

  try {
    insertStmt.run({ id_eleitor, id_candidato });
    socket.emit('voteResponse', { success: true, message: 'Voto registrado com sucesso!' });
  } catch (error) {
    socket.emit('voteResponse', { success: false, message: 'Erro ao registrar voto: ' + error.message });
  }
}


