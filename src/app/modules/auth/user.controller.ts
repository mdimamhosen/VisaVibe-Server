import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {});
const changePassword = catchAsync(async (req, res) => {});
const verifyOTP = catchAsync(async (req, res) => {});
const resetPassword = catchAsync(async (req, res) => {});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  verifyOTP,
  resetPassword,
};
