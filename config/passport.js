const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mangoose = require('mongoose');
const keys = require('./keys');

// load user models

const User = mangoose.model('users');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        console.log(profile);

        // setup image variable and remove 'size?= ' from google image
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf('?')
        );
        console.log(image);

        // create New Users
        const newUser = {
          googleID: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          image: image
        };

        // check for existing user
        User.findOne({
          googleID: profile.id
        }).then(user => {
          if (user) {
            // return user
            done(null, user);
          } else {
            // create User
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );

  // serialize users
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((user, done) => {
    User.findById(user.id).then(user => {
      done(null, user);
    });
  });
};
