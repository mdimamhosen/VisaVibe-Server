import { Router } from 'express';
import { UserRole } from '../../types/user.types';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
// import { parseBody } from '../../middleware/bodyParser';
// import validateRequest from '../../middleware/validateRequest';
// import { UniversityValidations } from './university.validation';
import { UniversityController } from './university.controller';

const router = Router();

router.post(
  '/create-university',
  auth(UserRole.ADMIN),
  multerUpload.single('logo'),
  // parseBody,
  // validateRequest(UniversityValidations.universityCreateSchemaValidation),
  UniversityController.createUniversity
);
router.get('/get-universities', UniversityController.getAllUniversities);
router.get('/get-university/:id', UniversityController.getUniversityById);
router.delete(
  '/delete-university/:id',
  auth(UserRole.ADMIN),
  UniversityController.deleteUniversity
);

router.patch(
  '/update-university/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('logo'),
  // parseBody,
  // validateRequest(UniversityValidations.universityUpdateSchemaValidation),
  UniversityController.updateUniversity
);

export const UniversityRoutes = router;
