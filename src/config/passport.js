const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { BasicStrategy } = require('passport-http');
const config = require('./config');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  const user = config.accessUser;
  if (payload.username !== user.username || payload.password !== user.password) {
    return done(null, false);
  }
  done(null, user);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const basicStrategy = new BasicStrategy((username, password, done) => {
  const user = config.basicAuth;
  if (username !== user.username || password !== user.password) {
    return done(null, false);
  }
  done(null, user);
});

module.exports = {
  jwtStrategy,
  basicStrategy,
};
