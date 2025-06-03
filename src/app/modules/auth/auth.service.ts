import mongoose, { ClientSession } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAuth, IJwtPayload } from './auth.interface';
import User from '../User/user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload, Secret } from 'jsonwebtoken';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (!user.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      id: user._id as string,
      name: user.name as string,
      email: user.email as string,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (!isUserExist.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }

  const jwtPayload: IJwtPayload = {
    id: isUserExist._id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    isActive: isUserExist.isActive,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { id } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ _id: id }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!user.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User account is inactive');
  }

  // Validate old password
  const isOldPasswordCorrect = await User.isPasswordMatched(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password');
  }

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
  await User.updateOne({ _id: id }, { password: hashedPassword });

  return { message: 'Password changed successfully' };
};

const verifyOTP = async ({ email, otp }: { email: string; otp: string }) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!user.otpToken || user.otpToken === '') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'No OTP token found. Please request a new password reset OTP.'
    );
  }

  const decodedOtpData = verifyToken(user.otpToken as string, config.jwt_otp_secret as string);

  if (!decodedOtpData) {
    throw new AppError(StatusCodes.FORBIDDEN, 'OTP has expired or is invalid');
  }

  if (decodedOtpData.otp !== otp) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid OTP');
  }

  user.otpToken = null;
  await user.save();

  const resetToken = createToken(
    {
      id: user._id as string,
      name: user.name as string,
      email: user.email as string,
      isActive: user.isActive,
      role: user.role,
    },
    config.jwt_pass_reset_secret as string,
    config.jwt_pass_reset_expires_in as string
  );

  // Return the reset token
  return {
    resetToken,
  };
};

const resetPassword = async ({ token, newPassword }: { token: string; newPassword: string }) => {
  const session: ClientSession = await User.startSession();

  try {
    session.startTransaction();

    const decodedData = verifyToken(token as string, config.jwt_pass_reset_secret as string);

    const user = await User.findOne({ email: decodedData.email, isActive: true }).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(
      String(newPassword),
      Number(config.bcrypt_salt_rounds)
    );

    await User.updateOne({ email: user.email }, { password: hashedPassword }).session(session);

    await session.commitTransaction();

    return {
      message: 'Password changed successfully',
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  verifyOTP,
  resetPassword,
};
