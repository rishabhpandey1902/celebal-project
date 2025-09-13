import express from 'express';
import { getAlerts, markRead } from '../controllers/alertController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAlerts);
router.put('/:id/read', auth, markRead);

export default router;
