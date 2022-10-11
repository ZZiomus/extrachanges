const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models");
const { jwtSecretKey } = require("./jwt.config");

const jWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

// jwt strategy for login
passport.use(
  new JwtStrategy(jWTOptions, async (payload, done) => {
    try {
      const _id = payload.sub;
      const user = await User.findOne({ _id });
      if (user && payload.expiresIn > Date.now()) return done(null, user);

      return done(new Error("access token expired"), false);
    } catch (err) {
      done(err, false);
    }
  })
);
module.exports = passport;
