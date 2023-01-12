import MongooseClientRepository from '../../../repositories/implementations/MongooseClientRepository';
import DeleteClientController from './DeleteClientController';
import DeleteClientUseCase from './DeleteClientUseCase';

const mongooseClientRepository = new MongooseClientRepository();

const deleteClientUseCase = new DeleteClientUseCase(mongooseClientRepository);
const deleteClientController = new DeleteClientController(deleteClientUseCase);

export { deleteClientUseCase, deleteClientController };
