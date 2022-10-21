const passport = require('passport');
const passportStrategy = require('../config/passport');

passport.use(passportStrategy.jwtStrategy);
passport.use(passportStrategy.basicStrategy);

const jwt = passport.authenticate('jwt', { session: false });
const basic = passport.authenticate('basic', { session: false });
const init = () => passport.initialize();

module.exports = {
  init,
  jwt,
  basic,
};
