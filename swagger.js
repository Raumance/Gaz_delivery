const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gas Delivery API',
    description: 'API documentation for the gas delivery app',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './config/swagger-output.json';
const endpointsFiles = ['./index.js']; // fichier principal, adapte si tu as renommé

swaggerAutogen(outputFile, endpointsFiles, doc);
