/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import Client from '../../../entities/Client';
import { IClientRepository } from '../../../repositories/IClientRepository';
import { ICreateClientRequestDTO } from './CreateClientDTO';

export default class CreateClientUseCase {
  constructor(private clientRepo: IClientRepository) {}

  async clientExistsByCpf(cpf: string) {
    await this.clientRepo.existsByCpf(cpf);
  }

  async clientExistsByEmail(phone: string) {
    await this.clientRepo.existsByEmail(phone);
  }

  async clientExistsByPhone(rg: string) {
    await this.clientRepo.existsByPhone(rg);
  }

  async execute(data: ICreateClientRequestDTO) {
    const { name, email, phone, cpf, address } = data;
    await this.clientExistsByCpf(cpf);
    await this.clientExistsByEmail(email);
    await this.clientExistsByPhone(phone);

    const client = new Client(name, email, phone, cpf, address);

    await this.clientRepo.save(client);
  }
}
