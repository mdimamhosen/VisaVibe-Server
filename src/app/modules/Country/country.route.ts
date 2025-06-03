import { Router } from 'express';

import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import { UserRole } from '../../types/user.types';
import { CountryController } from './country.controller';
import validateRequest from '../../middleware/validateRequest';
import { CountryValidations } from './country.validation';

const router = Router();

router.post(
  '/create-country',
  auth(UserRole.ADMIN),
  multerUpload.single('flag'),
  parseBody,
  validateRequest(CountryValidations.createCountryValidation),
  CountryController.createCountry
);

export const CountryRoutes = router;
