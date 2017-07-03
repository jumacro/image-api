import passport from 'passport';
import passportHttp from 'passport-http';
import config from '../../env';

const debug = require('debug')('image-api-server:index');

const appSecret = config.security.api.appSecret;
const appId = config.security.api.appId;

const AuthStrategy = new passportHttp.BasicStrategy(
  function(userid, password, done) {
    if (userid.valueOf() === appId &&
      password.valueOf() === appSecret)
      return done(null, true);
    else
      return done(null, false);
  }
);

passport.use(AuthStrategy);

const isAuthenticated = passport.authenticate('basic', { session: false });

export default { isAuthenticated };

