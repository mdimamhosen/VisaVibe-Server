import { z } from 'zod';

const createBlog = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    image: z.string().url('Image must be a valid URL'),
  }),
});

const updateBlog = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    image: z.string().url('Image must be a valid URL').optional(),
  }),
});

export const BlogValidations = {
  createBlog,
  updateBlog,
};
