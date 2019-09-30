import database from '../src/models'

class ClientService {
  static async getAllClients() {
    try {
      return await database.Clients.findAll()
    } catch (error) {
      throw error
    }
  }

  static async deleteOne(id) {
    try {
      const oneToDelete = await database.Clients.findOne({
        where: { id: Number(id) }
      })

      if (oneToDelete) {
        const deletedOne = await database.Clients.destroy({
          where: { id: Number(id) }
        })
        return deletedOne
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default ClientService
