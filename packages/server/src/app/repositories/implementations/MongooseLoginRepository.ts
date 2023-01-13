/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Model, Schema, model, models } from 'mongoose';
import { AdminSchema } from '../../../database/schemas/AdminSchema';
import throwCustomError from '../../error/throwCustomError';
import { ILoginRepository } from '../ILoginRepository';
import errorMessages from '../../error/errorMessages';
import Admin from '../../entities/Admin';
import IAdmin from '../../../database/schemas/interfaces/IAdmin';

export default class MongooseLoginRepository implements ILoginRepository {
  private schema: Schema;

  private model: Model<IAdmin>;

  constructor() {
    this.schema = AdminSchema;
    this.model = models.Admin || model('Admin', this.schema);
  }

  async validateUsername(username: string): Promise<Admin> {
    const admin = await this.model.findOne({ username });
    if (!admin)
      return throwCustomError('notFoundError', errorMessages.NOT_FOUND_ADMIN);
    return admin;
  }

  async validatePassword(password: string, dbPassword: string): Promise<void> {
    const passValidation = await bcrypt.compare(password, dbPassword);
    if (!passValidation) {
      return throwCustomError(
        'unauthorizedError',
        errorMessages.INCORRECT_PASSWORD
      );
    }
  }

  login(admin: Admin): string {
    const token = jwt.sign(
      { data: admin.id },
      process.env.JWT_SECRET || 'secret'
    );
    return token;
  }
}
