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

  static async insert(req, res) {
    // if (!req.body.title || !req.body.price || !req.body.description) {
    //   util.setError(400, 'Please provide complete details');
    //   return util.send(res);
    // }
    console.log('event controller')
    const newOne = req.body
    try {
      const createdOne = await EventService.insertOne(newOne)
      util.setSuccess(201, 'Event Added!', createdOne)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
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

  static async deleteSeries(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const onesToDelete = await EventService.deleteSeries(id)

      if (onesToDelete) {
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
