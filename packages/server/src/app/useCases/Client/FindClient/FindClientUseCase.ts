/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { IClientRepository } from '../../../repositories/IClientRepository';

export default class FindClientUseCase {
  constructor(private clientRepo: IClientRepository) {}

  async findAll() {
    const clients = await this.clientRepo.findAll();
    return clients;
  }

  async findById(id: string) {
    const client = await this.clientRepo.findById(id);
    return client;
  }
}
