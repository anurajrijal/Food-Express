import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User } from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists 
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // If not, create a new user 
        const newUser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            role: 'user',
        });
        return done(null, newUser);
    } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
