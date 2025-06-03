import { UserRole } from '../../types/user.types';

export interface IAuth {
  email: string;
  password: string;
  // name: string;
  // role: UserRole;
}

export interface IJwtPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
