import Client from '../../../../entities/Client';

export default interface IFindClientsReturn {
  clients: Client[];
  countClients: number;
}
