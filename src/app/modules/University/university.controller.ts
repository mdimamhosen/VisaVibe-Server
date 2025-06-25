import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UniversityServices } from './university.services';

const createUniversity = catchAsync(async (req, res) => {
  console.log('Creating university with data:', req.body);
  const result = await UniversityServices.createUniversity(req.body, req.file as IImageFile);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'University creation failed',
      data: null,
    });

    return;
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'University created successfully',
    data: result,
  });
});

const getAllUniversities = catchAsync(async (req, res) => {
  const result = await UniversityServices.getAllUniversities();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Universities retrieved successfully',
    data: result,
  });
});
const getUniversityById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await UniversityServices.getUniversityById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'University not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'University retrieved successfully',
    data: result,
  });
});

const updateUniversity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UniversityServices.updateUniversity(id, req.body, req.file as IImageFile);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'University not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'University updated successfully',
    data: result,
  });
});

const deleteUniversity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UniversityServices.deleteUniversity(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'University not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'University deleted successfully',
    data: result,
  });
});

export const UniversityController = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
};
