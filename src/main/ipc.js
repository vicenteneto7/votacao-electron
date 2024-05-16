/* import db from '../renderer/src/models/DBManager.js'
import { ipcMain } from 'electron'

ipcMain.handle('getDocuments', async () => {
  const query = 'SELECT * FROM documents;'
  const stmt = db.prepare(query)

  return stmt.all()
})

ipcMain.handle('getDocumentById', async (_, { id }) => {
  const query = `SELECT * FROM documents WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.get(id)
})

ipcMain.handle('addDocument', async () => {
  const body = {
    title: 'Untitled',
    content: 'Untitled'
  }

  const query = `INSERT INTO documents (title)
      VALUES (:title)`
  const stmt = db.prepare(query)

  return stmt.run({ ...body })
})

ipcMain.handle('updateDocumentsById', async (_, { id, title, content }) => {
  const body = {
    id,
    title,
    content,
  }

  const query = `UPDATE documents SET title = ?, content = ? WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.run(body.title, body.content, body.id)
})

ipcMain.handle('deleteDocumentsById', async (_, { id }) => {
  const query = `DELETE FROM documents WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.run(id)
})

*/


