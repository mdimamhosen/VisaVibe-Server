import { StatusCodes } from 'http-status-codes';
// import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { IImageFile } from '../../interface/IImageFile';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);

  //   const { refreshToken, accessToken } = result;

  //   res.cookie('refreshToken', refreshToken, {
  //     secure: config.NODE_ENV === 'production',
  //     httpOnly: true,
  //     sameSite: 'none',
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //   });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registration completed successfully!',
    // data: {
    //   accessToken,
    // },
    data: result,
  });
});

const myProfile = catchAsync(async (req, res) => {
  const result = await UserServices.myProfile(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfile(req.file as IImageFile, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Profile updated successfully`,
    data: result,
  });
});
export const UserController = {
  registerUser,
  myProfile,
  updateProfile,
};
