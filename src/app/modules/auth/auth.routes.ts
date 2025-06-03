import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../../types/user.types';
import { AuthController } from './user.controller';

const router = Router();

router.post('/login', AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/change-password', auth(UserRole.ADMIN), AuthController.changePassword);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;
