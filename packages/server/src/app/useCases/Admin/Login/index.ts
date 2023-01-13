import MongooseLoginRepository from '../../../repositories/implementations/MongooseLoginRepository';
import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

const mongooseLoginRepository = new MongooseLoginRepository();

const loginUseCase = new LoginUseCase(mongooseLoginRepository);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
