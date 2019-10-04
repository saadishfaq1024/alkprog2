import { Router } from 'express'
import EventController from '../controllers/EventController'

const router = Router()

router.get('/', EventController.getAll)
router.delete('/:id', EventController.deleteOne)
router.delete('/series/:id', EventController.deleteSeries)
router.post('/insert', EventController.insert)
// router.post('/insert', EventController.insertOne)
export default router
