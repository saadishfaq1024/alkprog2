import { query } from './connection'

class ClientService {
  static async getAllClients() {
    const sql = 'SELECT * FROM clients'

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }

  static async deleteOne(id) {
    const sql = `DELETE FROM clients WHERE id = ${id}`

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }
}

export default ClientService
