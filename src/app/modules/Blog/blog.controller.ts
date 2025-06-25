import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import { BlogService } from './blog.services';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlog(req.body, req.file as IImageFile);
  if (!result) {
    res.status(400).json({
      success: false,
      message: 'Blog creation failed',
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogs();
  res.status(200).json({
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getBlogById(id);
  if (!result) {
    res.status(404).json({
      success: false,
      message: 'Blog not found',
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlog(id, req.body, req.file as IImageFile);
  if (!result) {
    res.status(400).json({
      success: false,
      message: 'Blog update failed',
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);
  if (!result) {
    res.status(404).json({
      success: false,
      message: 'Blog not found',
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
