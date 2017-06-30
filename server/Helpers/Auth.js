import passport from 'passport';
import passportJwt from 'passport-jwt';
import config from '../../env';

// const debug = require('debug')('image-api-server:index');

const tokenKey = config.security.api.appSecret;
const extractJwt = passportJwt.ExtractJwt;
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeader(),
  secretOrKey: tokenKey
};

const JwtStrategy = passportJwt.Strategy;
const AuthStrategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  next(null, jwtPayload);

});

passport.use(AuthStrategy);

const isAuthenticated = passport.authenticate('jwt', { session: false });

export default { isAuthenticated };
