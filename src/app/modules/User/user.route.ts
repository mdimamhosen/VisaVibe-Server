import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import { UserRole } from '../../types/user.types';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

router.get('/me', auth(UserRole.ADMIN), UserController.myProfile);

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  UserController.registerUser
);
// update profile
router.patch(
  '/update-profile',
  auth(UserRole.ADMIN),
  multerUpload.single('profilePhoto'),
  parseBody,
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile
);

export const UserRoutes = router;
