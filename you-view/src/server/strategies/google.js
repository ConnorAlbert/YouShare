const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube.force-ssl', // Added scope for YouTube actions
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Store accessToken if needed for future API calls to YouTube
      console.log('Access Token:', accessToken);
      console.log('User Profile:', profile);
      done(null, { profile, accessToken }); // Include accessToken in the user object
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((serializedUser, done) => {
  done(null, serializedUser);
});

const { Router } = require('express');
const router = Router();

// Start the authentication process
router.get('/google', passport.authenticate('google'));

// Handle the callback from Google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // User will be redirected to your home page after successful authentication
  res.redirect('http://localhost:3000/home');
});

module.exports = router;
