/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import DeleteClientUseCase from './DeleteClientUseCase';

export default class DeleteClientController {
  constructor(private deleteClientUseCase: DeleteClientUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteClientUseCase.execute(id);

    return response
      .status(201)
      .json({ message: 'Cliente removido com sucesso!' });
  }
}
