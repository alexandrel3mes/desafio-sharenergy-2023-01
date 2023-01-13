import 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import throwCustomError from '../error/throwCustomError';

export interface TokenPayload {
  userId: string;
  username: string;
}

const authorize = {
  auth(req: Request, _: Response, next: NextFunction): void {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return throwCustomError('unauthorizedError', 'Token not found');
    }

    const [, token] = authToken.split(' ');

    if (!token) {
      return throwCustomError('unauthorizedError', 'Bad format token');
    }

    try {
      jwt.verify(token, authConfig.secret);

      return next();
    } catch (e) {
      return throwCustomError(
        'unauthorizedError',
        'Token must be a valid token'
      );
    }
  },
};

export default authorize;
