/* eslint-disable no-unused-vars */
import Admin from '../entities/Admin';

export interface ILoginRepository {
  validateUsername(username: string): Promise<Admin>;
  validatePassword(password: string, dbPassword: string): Promise<void>;
  login(user: Admin): string;
}
