/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import CreateClientUseCase from './CreateClientUseCase';

export default class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, phone, address } = request.body;

    await this.createClientUseCase.execute({
      name,
      cpf,
      email,
      phone,
      address,
    });

    return response
      .status(201)
      .json({ message: 'Cliente cadastrado com sucesso!' });
  }
}
