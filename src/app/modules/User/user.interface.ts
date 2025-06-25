import { Document, Model } from 'mongoose';
import { UserRole } from '../../types/user.types';
export { UserRole };
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  profilePicture?: string;
  lastLogin?: Date;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}
