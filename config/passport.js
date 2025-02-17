const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const Admin    = require('../app/models/admin');
const config  = require('../config/database'); // get db config file


module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Admin.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
