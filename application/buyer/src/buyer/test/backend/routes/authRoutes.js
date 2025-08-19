import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackHandler,
  sendMobileOTP,
  verifyMobileOTP
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthCallbackHandler);

router.post('/mobile/send-otp', sendMobileOTP);
router.post('/mobile/verify-otp', verifyMobileOTP);

export default router;
