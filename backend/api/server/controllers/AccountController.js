import TransactionService from '../services/TransactionService'
import Util from '../utils/Utils'

const util = new Util()

class AccountController {
  static async getAllTransaction(req, res) {
    try {
      const allAccounts = await TransactionService.getAll()
      if (allAccounts.length > 0) {
        util.setSuccess(200, 'Accounts retrieved', allAccounts)
      } else {
        util.setSuccess(200, 'No Account found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async deleteOneTransaction(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const oneToDelete = await AccountService.deleteOne(id)

      if (oneToDelete) {
        util.setSuccess(200, 'Account deleted')
      } else {
        util.setError(404, `Account with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addTransaction(req, res) {
    // if (
    //   !req.body.date ||
    //   !req.body.transType ||
    //   !req.body.payor ||
    //   !req.body.amount ||
    //   !req.body.method
    // ) {
    //   util.setError(400, 'Please provide complete details')
    //   return util.send(res)
    // }
    const newOne = req.body
    try {
      const createdOne = await TransactionService.addOne(newOne)
      util.setSuccess(201, 'Transaction Added!', createdOne)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }
}

export default AccountController
