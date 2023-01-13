import { Router } from 'express';
import { loginController } from '../../useCases/Admin/Login';
import LoginValidation from '../../validators/Admin/LoginValidation';

const loginRouter = Router();

loginRouter.post('/', LoginValidation, (request, response) => {
  return loginController.handle(request, response);
});

export default loginRouter;
