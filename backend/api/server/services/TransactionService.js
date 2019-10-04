import { query } from './connection'

class TransactionService {
  static async getAll() {
    var sql =
      "SELECT id, DATE_FORMAT(date, '%m/%d/%Y') as transDate, transType, payor, amount, method, description  from transactions"

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

  static async addOne(newOne) {
    const sql =
      'INSERT INTO transactions (date, transType, payor, amount, method, description) VALUES (?, ?, ?, ?, ?,?) '
    const { date, transType, payor, amount, method, description } = newOne

    try {
      return await query(sql, [
        date,
        transType,
        payor,
        amount,
        method,
        description
      ])
    } catch (error) {
      console.log('exception: ', error)
      throw error
    }
  }
}

export default TransactionService
