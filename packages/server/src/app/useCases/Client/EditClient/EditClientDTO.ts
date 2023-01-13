import IEditAddressDTO from './IEditAddressDTO';

export interface IEditClientRequestDTO {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  address?: IEditAddressDTO;
}
