import MemberService from '../services/MemberService'
import Util from '../utils/Utils'

const util = new Util()

class MemberController {
  static async getAllMembers(req, res) {
    try {
      const allMembers = await MemberService.getAllMembers()
      if (allMembers.length > 0) {
        util.setSuccess(200, 'Members retrieved', allMembers)
      } else {
        util.setSuccess(200, 'No member found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async getTherapists(req, res) {
    try {
      const therapists = await MemberService.getTherapists()
      if (therapists.length > 0) {
        util.setSuccess(200, 'Therapists retrieved', therapists)
      } else {
        util.setSuccess(200, 'No therapist found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default MemberController
