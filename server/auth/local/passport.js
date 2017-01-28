var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('./../../logger/logger');
let PortalUser = require('./../../models/portalUser');

exports.setup = function (config) {

  logger.debug('Entering passport.setup for local Login');

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function (email, password, done) {

      logger.debug('Passport.Callback Authenticate User')
      let portalUser = new PortalUser(email);

      portalUser.login(
        password,
        function (err, user) {
          if (err) {
            logger.info('Error Occurred')
            logger.error(err);
          }
          logger.info('Authentication successful user received', user);
          logger.info(err);
          if ( err ) {
            logger.info('Error Occurred', err);
            done(err, null);
            return;
          }

          if (! user) {
            done(null, false, {message: 'The email or password is not correct. Please try again'});
            return;
          }
          logger.debug('Passport.Callback User Exit')
          done(null, user);
          return;
        });
    }
  ));
};