import { Router } from 'express';
import clientRouter from './routesClient/client.routes';

const routes = Router();

routes.use('/client', clientRouter);

export default routes;
