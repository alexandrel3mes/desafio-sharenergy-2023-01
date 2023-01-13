import { resolve } from 'path';
import 'dotenv/config';

export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação - Desafio ShareEnergy 2023/01',
      version: '1.0.0',
      description: 'Documentação da API ShareEnergy.',
    },
    servers: [
      {
        url: `${process.env.URL_API}:${process.env.APP_PORT}`,
        description: 'server',
      },
    ],
  },
  apis: [resolve(__dirname, '..', '..', '..', 'docs', '**', '*.yml')],
};
