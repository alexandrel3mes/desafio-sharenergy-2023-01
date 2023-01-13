/* eslint-disable no-useless-constructor */
import { IClientRepository } from '../../../repositories/IClientRepository';
import { IEditClientRequestDTO } from './EditClientDTO';

export default class EditClientUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private clientRepo: IClientRepository) {}

  async clientExistsByEmail(email: string) {
    await this.clientRepo.existsByEmail(email);
  }

  async clientExistsByPhone(phone: string) {
    await this.clientRepo.existsByPhone(phone);
  }

  async clientExistsByCpf(cpf: string) {
    await this.clientRepo.existsByCpf(cpf);
  }

  async execute(id: string, data: IEditClientRequestDTO) {
    if (data.cpf) await this.clientExistsByCpf(data.cpf);
    if (data.phone) await this.clientExistsByPhone(data.phone);
    if (data.email) await this.clientExistsByEmail(data.email);

    await this.clientRepo.edit(id, data);
  }
}
