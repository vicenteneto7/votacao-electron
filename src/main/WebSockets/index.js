const { Server } = require('socket.io');
const bcrypt = require('bcrypt');
const { default: db } = require('../../renderer/src/models/DBManager');

const io = new Server(8082, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('loginEleitor', async (credentials) => {
    const { email, senha } = credentials;

    const query = `
        SELECT * FROM Eleitor WHERE email = :email
      `;
    const stmt = db.prepare(query);

    const eleitor = stmt.get({ email });

    let response;
    if (eleitor) {
      const isPasswordValid = await bcrypt.compare(senha, eleitor.senha);
      if (isPasswordValid) {
        response = {
          success: true,
          message: 'Login bem-sucedido!',
          admin: Boolean(eleitor.admin),
          eleitorId: eleitor.id_eleitor,
          nome: eleitor.nome,
        };
      } else {
        response = { success: false, message: 'Senha incorreta.' };
      }
    } else {
      response = { success: false, message: 'Usuário não encontrado.' };
    }

    // Envie a resposta de volta ao cliente
    socket.emit('loginResponse', response);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});
