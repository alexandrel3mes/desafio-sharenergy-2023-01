import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './app/routes';
import errorMiddleware from './app/middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default new App();
