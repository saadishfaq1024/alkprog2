import { Router } from 'express';
import MemberController from '../controllers/MemberController';

const router = Router();

router.get('/', MemberController.getAllMembers);

export default router;
