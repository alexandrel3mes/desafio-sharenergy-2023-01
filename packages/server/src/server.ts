import App from './app';
import 'dotenv/config';
import connectToDatabase from './database/connection';

const PORT = process.env.APP_PORT || 3001;
const app = App;

connectToDatabase()
  .then(() => {
    app.start(PORT);
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
