import database from '../src/models';

class ClientService {
  static async getAllClients() {
    try {
      return await database.Clients.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export default ClientService;