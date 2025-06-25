import { Router } from 'express';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
// import { parseBody } from '../../middleware/bodyParser';
// import validateRequest from '../../middleware/validateRequest';
// import { BlogValidations } from './blog.validation';
import { UserRole } from '../../types/user.types';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/create-blog',
  auth(UserRole.ADMIN),
  multerUpload.single('image'),
  // parseBody,
  // validateRequest(BlogValidations.createBlog),
  BlogController.createBlog
);
router.get('/get-blogs', BlogController.getAllBlogs);
router.get('/get-blog/:id', BlogController.getBlogById);
router.delete('/delete-blog/:id', auth(UserRole.ADMIN), BlogController.deleteBlog);

router.patch(
  '/update-blog/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('image'),
  // parseBody,
  // validateRequest(BlogValidations.updateBlog),
  BlogController.updateBlog
);

export const BlogRoutes = router;
