import { Router } from 'express';
import { createClientController } from '../../useCases/Client/CreateClient';
import { deleteClientController } from '../../useCases/Client/DeleteClient';
import { editClientController } from '../../useCases/Client/EditClient';
import { findClientController } from '../../useCases/Client/FindClient';
import CreateClientValidation from '../../validators/Client/CreateClientValidation';
import EditClientValidation from '../../validators/Client/EditClientValidation';
import IdValidator from '../../validators/Client/IdValidator';
import authorize from '../../middlewares/authorize';

const clientRouter = Router();

clientRouter
  .route('/')
  .post(authorize.auth, CreateClientValidation, (request, response) => {
    return createClientController.handle(request, response);
  })
  .get(authorize.auth, (request, response) => {
    return findClientController.handle(request, response);
  });

clientRouter
  .route('/:id')
  .get(authorize.auth, IdValidator, (request, response) => {
    return findClientController.handle(request, response);
  })
  .delete(authorize.auth, IdValidator, (request, response) => {
    return deleteClientController.handle(request, response);
  })
  .patch(
    authorize.auth,
    IdValidator,
    EditClientValidation,
    (request, response) => {
      return editClientController.handle(request, response);
    }
  );

export default clientRouter;
