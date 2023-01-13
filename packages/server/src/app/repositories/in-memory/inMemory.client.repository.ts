import Client from '../../entities/Client';
import IFindClientsReturn from '../../useCases/Client/FindClient/interfaces/IFindClientsReturn';
import { IClientRepository } from '../IClientRepository';

export default class InMemoryClientRepository implements IClientRepository {
  public items: Client[] = [];

  async findAll(): Promise<IFindClientsReturn> {
    const clients = this.items;
    if (clients.length === 0) throw new Error('Sem clientes cadsatrados');
    return {
      clients,
      countClients: clients.length,
    };
  }

  async findById(id: string) {
    const finder = this.items.find((item) => {
      return item.id === id;
    });

    if (!finder) throw new Error('Cliente não encontrado');
    return finder;
  }

  async remove(id: string): Promise<void> {
    const filter = this.items.filter((item) => item.id !== id);
    this.items = filter;
  }

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
