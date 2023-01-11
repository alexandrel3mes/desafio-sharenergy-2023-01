import { Model, Schema, model, models } from 'mongoose';
import { ClientSchema } from '../../../database/schemas/ClientSchema';
import IClient from '../../../database/schemas/interfaces/IClient';
import Client from '../../entities/Client';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import { IClientRepository } from '../IClientRepository';

export default class MongooseClientRepository implements IClientRepository {
  private schema: Schema; // Atributo para o "molde"

  private model: Model<IClient>; // Atributo para criar coleção e fornecer acesso ao banco

  constructor() {
    this.schema = ClientSchema;
    this.model = models.Client || model('Client', this.schema);
  }

  async existsByCpf(cpf: string): Promise<void> {
    const client = await this.model.findOne({ cpf });
    if (client)
      throwCustomError(
        'validationError',
        errorMessages.CLIENT_ALREADY_EXIST_CPF
      );
  }

  async existsByPhone(phone: string): Promise<void> {
    const client = await this.model.findOne({ phone });
    if (client)
      throwCustomError(
        'validationError',
        errorMessages.CLIENT_ALREADY_EXIST_PHONE
      );
  }

  async existsByEmail(email: string): Promise<void> {
    const client = await this.model.findOne({ email });
    if (client)
      throwCustomError(
        'validationError',
        errorMessages.CLIENT_ALREADY_EXIST_EMAIL
      );
  }

  save(client: Client): Promise<Client> {
    return this.model.create({ ...client });
  }
}
