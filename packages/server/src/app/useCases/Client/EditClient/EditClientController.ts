/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import EditClientUseCase from './EditClientUseCase';

export default class EditClientController {
  constructor(private editClientUseCase: EditClientUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, address, phone } = request.body;
    const { id } = request.params;

    await this.editClientUseCase.execute(id, {
      name,
      cpf,
      email,
      address,
      phone,
    });

    return response
      .status(201)
      .json({ message: 'Cliente editado com sucesso!' });
  }
}
