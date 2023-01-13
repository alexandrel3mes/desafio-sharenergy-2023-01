import FindClientController from './FindClientController';
import FindClientUseCase from './FindClientUseCase';
import MongooseClientRepository from '../../../repositories/implementations/MongooseClientRepository';

const mongooseClientRepository = new MongooseClientRepository();

const findClientUseCase = new FindClientUseCase(mongooseClientRepository);
const findClientController = new FindClientController(findClientUseCase);

export { findClientUseCase, findClientController };
