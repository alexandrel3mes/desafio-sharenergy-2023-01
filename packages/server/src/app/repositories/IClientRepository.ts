/* eslint-disable no-unused-vars */
import Client from '../entities/Client';

export interface IClientRepository {
  existsByCpf(cpf: string): Promise<void>;
  existsByPhone(phone: string): Promise<void>;
  existsByEmail(email: string): Promise<void>;
  save(client: Client): Promise<Client>;
  findById(id: string);
  remove(id: string): Promise<void>;
}
