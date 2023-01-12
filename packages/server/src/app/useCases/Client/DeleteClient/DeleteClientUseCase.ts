/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { IClientRepository } from '../../../repositories/IClientRepository';

export default class DeleteClientUseCase {
  constructor(private clientRepo: IClientRepository) {}

  async execute(id: string) {
    await this.clientRepo.findById(id);

    await this.clientRepo.remove(id);
  }
}
