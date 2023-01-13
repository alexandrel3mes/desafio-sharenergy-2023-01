/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { ILoginRepository } from '../../../repositories/ILoginRepository';
import { ILoginRequestDTO } from './LoginDTO';

export default class LoginUseCase {
  constructor(private loginRepo: ILoginRepository) {}

  async findByUsername(username: string) {
    const user = await this.loginRepo.validateUsername(username);
    return user;
  }

  async validatePass(password: string, dbPassword: string) {
    await this.loginRepo.validatePassword(password, dbPassword);
  }

  async execute(data: ILoginRequestDTO) {
    const user = await this.findByUsername(data.username);
    await this.validatePass(data.password, user.password);

    const token = this.loginRepo.login(user);

    return token;
  }
}
