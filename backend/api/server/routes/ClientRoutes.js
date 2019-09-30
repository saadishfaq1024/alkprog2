import { Router } from 'express'
import ClientController from '../controllers/ClientController'

const router = Router()

router.get('/all', ClientController.getAllClients)
router.delete('/:id', ClientController.deleteOne)
export default router
