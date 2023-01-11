/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import InMemoryClientRepository from '../../repositories/in-memory/inMemory.client.repository';
import CreateClientUseCase from './CreateClientUseCase';

describe('Create Client', () => {
  it('should be able to create a client', async () => {
    const mockClientRepo = new InMemoryClientRepository();
    const useCase = new CreateClientUseCase(mockClientRepo);

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

    await useCase.execute(mockClientPayload);

    const find = mockClientRepo.items.find(
      (item) => item.cpf === mockClientPayload.cpf
    );

    expect(find).toBeTruthy();
  });
});
