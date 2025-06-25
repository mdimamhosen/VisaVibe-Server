import mongoose from 'mongoose';
import { IUser } from './user.interface';

import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import { IJwtPayload } from '../auth/auth.interface';
import { IImageFile } from '../../interface/IImageFile';
import { UserRole } from '../User/user.interface';
import { AppError } from '../../utils/AppError';

// Function to register user
const registerUser = async (userData: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if ([UserRole.ADMIN].includes(userData.role)) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid role. Only User is allowed.');
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: userData.email }).session(session);
    if (existingUser) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered');
    }

    // Create the user
    const user = new User(userData);
    const createdUser = await user.save({ session });

    await session.commitTransaction();

    return createdUser;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const myProfile = async (authUser: IJwtPayload) => {
  const isUserExists = await User.findById(authUser.id);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
  }

  return await User.findById(authUser.id);
};

const updateProfile = async (file: IImageFile, authUser: IJwtPayload) => {
  const isUserExists = await User.findById(authUser.id);

  const payload: Partial<IUser> = { ...authUser };
  if (file && file.path) {
    payload.profilePicture = file.path;
  }

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
  }

  if (isUserExists.email !== authUser.email) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot change your email!');
  }
  if (isUserExists.role !== authUser.role) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot change your role!');
  }
  const updatedUser = await User.findByIdAndUpdate(authUser.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  return updatedUser;
};

export const UserServices = {
  registerUser,
  myProfile,
  updateProfile,
};
