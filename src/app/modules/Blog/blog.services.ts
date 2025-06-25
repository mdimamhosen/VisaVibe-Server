import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { AppError } from '../../utils/AppError';

const createBlog = async (payload: IBlog, file: IImageFile) => {
  const isBlogExists = await Blog.findOne({
    title: payload.title,
  });
  if (isBlogExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog with this title already exists');
  }
  if (file && file.path) {
    payload.image = file.path;
  }
  console.log('Payload:', payload);
  const blog = new Blog(payload);
  const createdBlog = await blog.save();
  if (!createdBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog creation failed');
  }
  return createdBlog;
};

const getAllBlogs = async () => {
  const blogs = await Blog.find();
  if (!blogs || blogs.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No blogs found');
  }
  return blogs;
};

const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const updateBlog = async (id: string, payload: IBlog, file: IImageFile) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (file && file.path) {
    payload.image = file.path;
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog update failed');
  }

  return updatedBlog;
};
const deleteBlog = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
