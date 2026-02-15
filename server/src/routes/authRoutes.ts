import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateSignup, validateSignin } from '../middleware/validation.js';

const router = Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/signin', validateSignin, authController.signin);
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
