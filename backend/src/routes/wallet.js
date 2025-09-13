import express from 'express';
import { transfer, getWallet } from '../controllers/walletController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getWallet);
router.post('/transfer', auth, transfer);

export default router;
