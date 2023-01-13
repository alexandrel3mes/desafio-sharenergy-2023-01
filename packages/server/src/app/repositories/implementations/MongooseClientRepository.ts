import { Model, Schema, model, models } from 'mongoose';
import { ClientSchema } from '../../../database/schemas/ClientSchema';
import IClient from '../../../database/schemas/interfaces/IClient';
import Client from '../../entities/Client';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import IFindClientsReturn from '../../useCases/Client/FindClient/interfaces/IFindClientsReturn';
import { IClientRepository } from '../IClientRepository';

export default class MongooseClientRepository implements IClientRepository {
  private schema: Schema;

  private model: Model<IClient>;

  constructor() {
    this.schema = ClientSchema;
    this.model = models.Client || model('Client', this.schema);
  }

  async findAll(): Promise<IFindClientsReturn> {
    const clients = await this.model.find();
    const countClients = await this.model.count();
    if (clients.length === 0 || countClients === 0)
      throwCustomError('notFoundError', errorMessages.NO_CLIENTS);
    return {
      clients,
      countClients,
    };
  }

  async findById(id: string) {
    const client = await this.model.findOne({ id });
    if (!client)
      throwCustomError('notFoundError', errorMessages.NOT_FOUND_CLIENT);
    return client;
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ id });
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
