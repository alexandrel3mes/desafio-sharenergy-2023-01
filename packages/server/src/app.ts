import express from 'express';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default new App();
