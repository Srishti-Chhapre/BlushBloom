import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { changePassword, loginUser, registerUser } from '../controllers/authController.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);
// POST /api/auth/login
router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);

export default router;
