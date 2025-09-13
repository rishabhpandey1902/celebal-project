import express from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController.js';
import { auth, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);
router.get('/', auth, admin, getAllUsers);

export default router;
