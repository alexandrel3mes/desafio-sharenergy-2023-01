/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import InMemoryClientRepository from '../../../repositories/in-memory/inMemory.client.repository';
import CreateClientUseCase from '../CreateClient/CreateClientUseCase';
import DeleteClientUseCase from './DeleteClientUseCase';

describe('Delete Client - InMemory', () => {
  it('should be able to delete a client', async () => {
    const mockClientRepo = new InMemoryClientRepository();
    const createUseCase = new CreateClientUseCase(mockClientRepo);
    const deleteUseCase = new DeleteClientUseCase(mockClientRepo);

    const mockClientPayload = {
      name: 'Alexandre',
      cpf: '06577789566',
      email: 'alexandreeduardo@email.com',
      phone: '87992456785',
      address: {
        street: 'Rua tal',
        district: 'Bairro X',
        city: 'Sao Paulo',
        state: 'SP',
        country: 'Brasil',
        zipcode: '29060670',
      },
    };

    await createUseCase.execute(mockClientPayload);
    const user = mockClientRepo.items.find(
      (item) => item.email === mockClientPayload.email
    );

    if (user && user.id)
      expect(await deleteUseCase.execute(user.id)).not.throw();
  });
});
