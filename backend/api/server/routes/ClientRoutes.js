import { Router } from 'express';
import ClientController from '../controllers/ClientController';

const router = Router();

router.get('/all', ClientController.getAllClients);

export default router;
