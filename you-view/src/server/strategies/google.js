const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        scope: ['email', 'profile'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
        done(null, profile);
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    // Serialize the user object and pass the serialized user to the 'done' callback
    done(null, user);
  });
  
  passport.deserializeUser((serializedUser, done) => {
    // Deserialize the user object from the session and pass it to the 'done' callback
    done(null, serializedUser);
  });