/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import InMemoryClientRepository from '../../../repositories/in-memory/inMemory.client.repository';
import CreateClientUseCase from '../CreateClient/CreateClientUseCase';
import EditClientUseCase from './EditClientUseCase';

describe('Edit Client - InMemory', () => {
  it('should be able to edit a client', async () => {
    const mockClientRepo = new InMemoryClientRepository();
    const createUseCase = new CreateClientUseCase(mockClientRepo);
    const editUseCase = new EditClientUseCase(mockClientRepo);

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

    const mockEditPayload = {
      name: 'Alexandre Lemes',
    };

    await createUseCase.execute(mockClientPayload);

    const find = mockClientRepo.items.find(
      (item) => item.cpf === mockClientPayload.cpf
    );

    if (find && find.id) await editUseCase.execute(find?.id, mockEditPayload);

    expect(find?.name).toEqual(mockEditPayload.name);
  });
});
