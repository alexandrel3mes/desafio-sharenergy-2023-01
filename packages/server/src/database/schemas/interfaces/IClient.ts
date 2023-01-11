import IAddress from './IAddress';

interface IClient {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: IAddress;
}

export default IClient;
