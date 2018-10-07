'use strict';

const { promisify } = require('util');
const app = require('./app');
const config = require('./config');
const database = require('./common/database');

const runServer = promisify(app.listen.bind(app));

database.initialize()
  .then(() => console.log('DB initialized'))
  .then(() => runServer(config.port, config.ip))
  .then(() => console.log('Server listening on port', config.port))
  .catch(err => console.error(err));
