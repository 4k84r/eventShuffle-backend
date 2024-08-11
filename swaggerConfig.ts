import  { Options } from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Event Shuffle API',
    version: '1.0.0',
    description: 'A simple API to store and shuffle the events.',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options: Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export default options;
