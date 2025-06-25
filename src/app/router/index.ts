import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CountryRoutes } from '../modules/Country/country.route';
import { UniversityRoutes } from '../modules/University/university.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { EmailRoutes } from '../modules/email/email';
const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/country',
    route: CountryRoutes,
  },
  {
    path: '/university',
    route: UniversityRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/send-email',
    route: EmailRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
