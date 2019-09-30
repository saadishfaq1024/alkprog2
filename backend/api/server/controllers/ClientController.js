import ClientService from '../services/ClientService'
import Util from '../utils/Utils'

const util = new Util()

class ClientController {
  static async getAllClients(req, res) {
    try {
      const allClients = await ClientService.getAllClients()
      console.log('aa', allClients)
      if (allClients.length > 0) {
        util.setSuccess(200, 'Clients retrieved', allClients)
      } else {
        util.setSuccess(200, 'No Client found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async deleteOne(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const oneToDelete = await ClientService.deleteOne(id)

      if (oneToDelete) {
        util.setSuccess(200, 'Client deleted')
      } else {
        util.setError(404, `Client with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default ClientController
