import { Model, Schema, model, models } from 'mongoose';
import { ClientSchema } from '../../../database/schemas/ClientSchema';
import IClient from '../../../database/schemas/interfaces/IClient';
import Client from '../../entities/Client';
import { IClientRepository } from '../IClientRepository';

export default class MongooseClientRepository implements IClientRepository {
  private schema: Schema; // Atributo para o "molde"

  private model: Model<IClient>; // Atributo para criar coleção e fornecer acesso ao banco

  constructor() {
    this.schema = ClientSchema;
    this.model = models.Client || model('Client', this.schema);
  }

  async existsByCpf(cpf: string): Promise<void> {
    const client = await this.model.exists({ cpf });
    if (client) throw new Error('Já existe um cliente com o CPF informado.');
  }

  async existsByPhone(phone: string): Promise<void> {
    const client = await this.model.exists({ phone });
    if (client)
      throw new Error('Já existe um cliente com o telefone informado.');
  }

  async existsByEmail(email: string): Promise<void> {
    const client = await this.model.exists({ email });
    if (client) throw new Error('Já existe um cliente com o email informado.');
  }

  save(client: Client): Promise<Client> {
    return this.model.create({ ...client });
  }
}
