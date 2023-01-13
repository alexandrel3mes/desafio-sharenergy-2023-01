import { Router } from 'express';
import loginRouter from './login/login.routes';
import clientRouter from './routesClient/client.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/login', loginRouter);

export default routes;
