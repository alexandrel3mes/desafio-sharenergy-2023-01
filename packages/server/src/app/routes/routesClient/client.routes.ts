import { Router } from 'express';
import { createClientController } from '../../useCases/CreateClient';
import CreateClientValidation from '../../validators/Client/CreateClientValidation';

const clientRouter = Router();

clientRouter.route('/').post(CreateClientValidation, (request, response) => {
  return createClientController.handle(request, response);
});

export default clientRouter;
