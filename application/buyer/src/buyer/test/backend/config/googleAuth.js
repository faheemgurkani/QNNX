import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        let user = await User.findOne({ googleId: profile.id });

        if (!user && email) {
          // If a user exists with the same email, link to Google
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            user.isVerified = true; // Google email is verified by Google
            await user.save();
          }
        }

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email,
            name: profile.displayName || 'Google User',
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
