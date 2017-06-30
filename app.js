import config from './env';
import app from './config/express';


const debug = require('debug')('image-api-server:index');

const port = process.env.PORT || config.port;
const env = process.env || config.env;

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port port
  const server = app.listen(port, () => {
    debug(`server started on port ${port} (${env})`);
  });
}

export default app;
