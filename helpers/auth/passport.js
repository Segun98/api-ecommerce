const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {

        let newUser = {
            first_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            id: profile.id
        }
        done(null, newUser)

    }
));