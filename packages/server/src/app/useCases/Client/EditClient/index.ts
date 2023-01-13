import EditClientController from './EditClientController';
import EditClientUseCase from './EditClientUseCase';
import MongooseClientRepository from '../../../repositories/implementations/MongooseClientRepository';

const mongooseOrmClientRepository = new MongooseClientRepository();

const editClientUseCase = new EditClientUseCase(mongooseOrmClientRepository);
const editClientController = new EditClientController(editClientUseCase);

export { editClientUseCase, editClientController };
