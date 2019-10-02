import { Router } from 'express'
import AccountController from '../controllers/AccountController'

const router = Router()

router.get('/transactions', AccountController.getAllTransaction)
router.delete('/transactions/:id', AccountController.deleteOneTransaction)
router.post('/transactions', AccountController.addTransaction)
// router.post('/insert', AccountController.insertOne)
export default router
