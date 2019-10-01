import { query } from './connection'

class EventService {
  static async getAll() {
    var sql = 'SELECT * FROM testevent'

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }

  static async deleteOne(id) {
    const sql = `DELETE FROM testevent WHERE id = ${id}`

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }
}

export default EventService
