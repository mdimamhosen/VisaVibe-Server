import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IJwtPayload } from './auth.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createToken = (jwtPayload: IJwtPayload, secret: Secret, expiresIn?: any) => {
  return jwt.sign(jwtPayload, secret, expiresIn ? { expiresIn } : undefined);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
