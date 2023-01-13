import Client from '../../entities/Client';
import { IEditClientRequestDTO } from '../../useCases/Client/EditClient/EditClientDTO';
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

  async edit(
    userId: string,
    clientPayload: IEditClientRequestDTO
  ): Promise<void> {
    const finder = await this.findById(userId);

    if (finder) {
      const index = this.items.indexOf(finder);

      if (clientPayload.name) this.items[index].name = clientPayload.name;
      if (clientPayload.cpf) this.items[index].cpf = clientPayload.cpf;
      if (clientPayload.email) this.items[index].email = clientPayload.email;
      if (clientPayload.address?.city)
        this.items[index].address.city = clientPayload.address.city;
      if (clientPayload.address?.street)
        this.items[index].address.street = clientPayload.address.street;
      if (clientPayload.address?.district)
        this.items[index].address.district = clientPayload.address.district;
      if (clientPayload.address?.state)
        this.items[index].address.state = clientPayload.address.state;
      if (clientPayload.address?.country)
        this.items[index].address.country = clientPayload.address.country;
      if (clientPayload.address?.zipcode)
        this.items[index].address.zipcode = clientPayload.address.zipcode;
      if (clientPayload.phone) this.items[index].phone = clientPayload.phone;
    }
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
