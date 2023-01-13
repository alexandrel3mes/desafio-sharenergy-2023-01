/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import InMemoryClientRepository from '../../../repositories/in-memory/inMemory.client.repository';
import CreateClientUseCase from '../CreateClient/CreateClientUseCase';
import FindClientUseCase from './FindClientUseCase';

describe('Find Client - InMemory', () => {
  it('should be able to find all clients', async () => {
    const mockClientRepo = new InMemoryClientRepository();
    const createUseCase = new CreateClientUseCase(mockClientRepo);
    const findUseCase = new FindClientUseCase(mockClientRepo);

    const mockClientOnePayload = {
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

    const mockClientTwoPayload = {
      name: 'Alexandre Eduardo',
      cpf: '46864594009',
      email: 'alexandrelemes@email.com',
      phone: '88992456785',
      address: {
        street: 'Rua tal',
        district: 'Bairro X',
        city: 'Sao Paulo',
        state: 'SP',
        country: 'Brasil',
        zipcode: '29060670',
      },
    };

    await createUseCase.execute(mockClientOnePayload);
    await createUseCase.execute(mockClientTwoPayload);

    const clients = await findUseCase.findAll();
    const { items } = mockClientRepo;

    expect(items.length).toEqual(clients.clients.length);
  });
});
