import ObjectID from 'bson-objectid';
import IAddress from '../../database/schemas/interfaces/IAddress';
import IClient from '../../database/schemas/interfaces/IClient';

export default class Client implements IClient {
  public readonly id?: string;

  name: string;

  email: string;

  phone: string;

  cpf: string;

  address: IAddress;

  constructor(props: Omit<Client, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = ObjectID().str;
    }
  }
}
