/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import LoginUseCase from './LoginUseCase';

export default class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const token = await this.loginUseCase.execute({
      username,
      password,
    });

    return response.status(200).json({ token });
  }
}
