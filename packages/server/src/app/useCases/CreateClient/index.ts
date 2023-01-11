import MongooseClientRepository from '../../repositories/implementations/MongooseClientRepository';
import CreateClientController from './CreateClientController';
import CreateClientUseCase from './CreateClientUseCase';

const mongooseClientRepository = new MongooseClientRepository();

const createClientUseCase = new CreateClientUseCase(mongooseClientRepository);
const createClientController = new CreateClientController(createClientUseCase);

export { createClientUseCase, createClientController };
