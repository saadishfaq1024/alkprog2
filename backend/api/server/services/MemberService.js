import { query } from './connection'

class MemberService {
  static async getAllMembers() {
    const sql = 'SELECT * FROM members'

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }

  static async getTherapists() {
    const sql =
      "SELECT id, member_full_name FROM members WHERE active =1 AND role = 'Therapist' "

    try {
      return await query(sql)
    } catch (error) {
      throw error
    }
  }
}

export default MemberService
