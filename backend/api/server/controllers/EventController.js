import EventService from '../services/EventService'
import Util from '../utils/Utils'

const util = new Util()

class EventController {
  static async getAll(req, res) {
    try {
      const allEvents = await EventService.getAll()
      if (allEvents.length > 0) {
        util.setSuccess(200, 'Events retrieved', allEvents)
      } else {
        util.setSuccess(200, 'No Event found')
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
      const oneToDelete = await EventService.deleteOne(id)

      if (oneToDelete) {
        util.setSuccess(200, 'Event deleted')
      } else {
        util.setError(404, `Event with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default EventController
