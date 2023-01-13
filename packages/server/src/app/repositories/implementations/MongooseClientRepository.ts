import { Model, Schema, model, models } from 'mongoose';
import { ClientSchema } from '../../../database/schemas/ClientSchema';
import IClient from '../../../database/schemas/interfaces/IClient';
import Client from '../../entities/Client';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import { IEditClientRequestDTO } from '../../useCases/Client/EditClient/EditClientDTO';
import IEditAddressDTO from '../../useCases/Client/EditClient/IEditAddressDTO';
import IFindClientsReturn from '../../useCases/Client/FindClient/interfaces/IFindClientsReturn';
import { IClientRepository } from '../IClientRepository';

export default class MongooseClientRepository implements IClientRepository {
  private schema: Schema;

  private model: Model<IClient>;

  constructor() {
    this.schema = ClientSchema;
    this.model = models.Client || model('Client', this.schema);
  }

  handleAddressChange(
    clientToUpdate: any,
    clientPayload: IEditClientRequestDTO
  ) {
    const returnedAddress: IEditAddressDTO = {};
    if (clientPayload.address?.city)
      returnedAddress.city = clientPayload.address?.city;
    if (!clientPayload.address?.city)
      returnedAddress.city = clientToUpdate.address?.city;

    if (clientPayload.address?.street)
      returnedAddress.street = clientPayload.address?.street;
    if (!clientPayload.address?.street)
      returnedAddress.street = clientToUpdate.address?.street;

    if (clientPayload.address?.district)
      returnedAddress.district = clientPayload.address?.district;
    if (!clientPayload.address?.district)
      returnedAddress.district = clientToUpdate.address?.district;

    if (clientPayload.address?.state)
      returnedAddress.state = clientPayload.address?.state;
    if (!clientPayload.address?.state)
      returnedAddress.state = clientToUpdate.address?.state;

    if (clientPayload.address?.country)
      returnedAddress.country = clientPayload.address?.country;
    if (!clientPayload.address?.country)
      returnedAddress.country = clientToUpdate.address?.country;

    if (clientPayload.address?.zipcode)
      returnedAddress.zipcode = clientPayload.address?.zipcode;
    if (!clientPayload.address?.zipcode)
      returnedAddress.zipcode = clientToUpdate.address?.zipcode;

    return returnedAddress;
  }

  async edit(
    userId: string,
    clientPayload: IEditClientRequestDTO
  ): Promise<void> {
    const client = await this.findById(userId);
    const address = this.handleAddressChange(client, clientPayload);
    await this.model.findOneAndUpdate(
      { userId },
      {
        ...clientPayload,
        address,
      }
    );
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
