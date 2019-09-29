import ClientService from '../services/ClientService';
import Util from '../utils/Utils';

const util = new Util();

class ClientController {
  static async getAllClients(req, res) {
    try {
      const allClients = await ClientService.getAllClients();
      console.log('aa', allClients)
      if (allClients.length > 0) {
        util.setSuccess(200, 'Clients retrieved', allClients);
      } else {
        util.setSuccess(200, 'No Client found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ClientController;
