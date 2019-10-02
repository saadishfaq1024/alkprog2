import { Router } from 'express'
import ClientController from '../controllers/ClientController'

const router = Router()

router.get('/all', ClientController.getAllClients)
router.delete('/:id', ClientController.deleteOne)
router.get('/payors', ClientController.getAllPayors)
export default router
