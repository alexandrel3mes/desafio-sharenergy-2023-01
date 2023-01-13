/* eslint-disable no-unused-vars */
import Client from '../entities/Client';
import { IEditClientRequestDTO } from '../useCases/Client/EditClient/EditClientDTO';
import IFindClientsReturn from '../useCases/Client/FindClient/interfaces/IFindClientsReturn';

export interface IClientRepository {
  existsByCpf(cpf: string): Promise<void>;
  existsByPhone(phone: string): Promise<void>;
  existsByEmail(email: string): Promise<void>;
  save(client: Client): Promise<Client>;
  findById(id: string);
  findAll(): Promise<IFindClientsReturn>;
  remove(id: string): Promise<void>;
  edit(userId: string, clientPayload: IEditClientRequestDTO): Promise<void>;
}
