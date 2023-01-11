import Client from '../../entities/Client';
import { IClientRepository } from '../IClientRepository';

export default class InMemoryClientRepository implements IClientRepository {
  public items: Client[] = [];

  async existsByCpf(cpf: string): Promise<void> {
    const finder = this.items.find((item) => {
      return item.cpf === cpf;
    });

    if (finder) throw new Error('Dados já usados');
  }

  async existsByPhone(phone: string): Promise<void> {
    const finder = this.items.find((item) => {
      return item.phone === phone;
    });

    if (finder) throw new Error('Dados já usados');
  }

  async existsByEmail(email: string): Promise<void> {
    const finder = this.items.find((item) => {
      return item.email === email;
    });

    if (finder) throw new Error('Dados já usados');
  }

  async save(client: Client): Promise<Client> {
    this.items.push(client);
    return client;
  }
}
