/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import FindClientUseCase from './FindClientUseCase';

export default class FindClientController {
  constructor(private findClientUseCase: FindClientUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (id) {
      const client = await this.findClientUseCase.findById(id);
      return response.status(200).json(client);
    }

    const clients = await this.findClientUseCase.findAll();

    return response.status(200).json(clients);
  }
}
