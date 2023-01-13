import { Router } from 'express';
import { createClientController } from '../../useCases/Client/CreateClient';
import { deleteClientController } from '../../useCases/Client/DeleteClient';
import { editClientController } from '../../useCases/Client/EditClient';
import { findClientController } from '../../useCases/Client/FindClient';
import CreateClientValidation from '../../validators/Client/CreateClientValidation';
import EditClientValidation from '../../validators/Client/EditClientValidation';
import IdValidator from '../../validators/Client/IdValidator';

const clientRouter = Router();

clientRouter
  .route('/')
  .post(CreateClientValidation, (request, response) => {
    return createClientController.handle(request, response);
  })
  .get((request, response) => {
    return findClientController.handle(request, response);
  });

clientRouter
  .route('/:id')
  .get(IdValidator, (request, response) => {
    return findClientController.handle(request, response);
  })
  .delete(IdValidator, (request, response) => {
    return deleteClientController.handle(request, response);
  })
  .patch(IdValidator, EditClientValidation, (request, response) => {
    return editClientController.handle(request, response);
  });

export default clientRouter;
