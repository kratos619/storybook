const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mangoose = require('mongoose');
const keys = require('./keys');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);
        })
    )
}