import ObjectID from 'bson-objectid';
import IAddress from '../../database/schemas/interfaces/IAddress';
import IClient from '../../database/schemas/interfaces/IClient';

export default class Client implements IClient {
  public readonly id?: string;

  public name: string;

  public email: string;

  public phone: string;

  public cpf: string;

  public address: IAddress;

  constructor(
    name: string,
    email: string,
    phone: string,
    cpf: string,
    address: IAddress,
    id?: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.address = address;
    if (!id) {
      this.id = ObjectID().str;
    }
  }
}
