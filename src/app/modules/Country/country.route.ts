import { Router } from 'express';

import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
// import { parseBody } from '../../middleware/bodyParser';
import { UserRole } from '../../types/user.types';
import { CountryController } from './country.controller';
// import validateRequest from '../../middleware/validateRequest';
// import { CountryValidations } from './country.validation';

const router = Router();

router.post(
  '/create-country',
  auth(UserRole.ADMIN),
  multerUpload.single('flag'),
  // parseBody,
  (req, res, next) => {
    console.log('Request received for creating country:', req.body);
    next();
  },
  // validateRequest(CountryValidations.createCountryValidation),
  CountryController.createCountry
);

router.get('/get-all-countries', CountryController.getAllCountries);

router.get('/get-country/:id', CountryController.getCountryById);

router.patch(
  '/update-country/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('flag'),
  // parseBody,
  // validateRequest(CountryValidations.updateCountryValidation),
  CountryController.updateCountry
);

router.delete('/delete-country/:id', auth(UserRole.ADMIN), CountryController.deleteCountry);

export const CountryRoutes = router;
