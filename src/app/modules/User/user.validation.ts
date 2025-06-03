import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    name: z.string().min(1, 'Name is required').optional(),
    profilePicture: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateProfileValidationSchema,
};
