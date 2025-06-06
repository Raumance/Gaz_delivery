const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gas Delivery API',
    description: 'API documentation automatique générée',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../index.js');  // <-- chemin corrigé
});

