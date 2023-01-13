import ObjectID from 'bson-objectid';
import IAdmin from '../../database/schemas/interfaces/IAdmin';

export default class Admin implements IAdmin {
  public readonly id?: string;

  username: string;

  password: string;

  constructor(username: string, password: string, id?: string) {
    this.username = username;
    this.password = password;
    if (!id) {
      this.id = ObjectID().str;
    }
  }
}
