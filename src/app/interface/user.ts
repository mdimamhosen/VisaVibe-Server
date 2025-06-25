import { UserRole } from '../types/user.types';

export type VerifiedUser = {
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
