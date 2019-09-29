import database from '../src/models'

class MemberService {
  static async getAllMembers() {
    try {
      return await database.Members.findAll()
    } catch (error) {
      throw error
    }
  }

  static async getTherapists() {
    try {
      return await database.Members.findAll({ where: { role: 'Therapist' } })
    } catch (error) {
      throw error
    }
  }
}

export default MemberService
