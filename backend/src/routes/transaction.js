import express from 'express';
import { addTransaction, getTransactions, getInsights } from '../controllers/transactionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addTransaction);
router.get('/', auth, getTransactions);
router.get('/insights', auth, getInsights);

export default router;
