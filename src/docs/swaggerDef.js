const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Sumber Bening API',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/RRRHAN/BackEnd_SumberBening/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
