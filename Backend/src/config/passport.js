import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User }from "../models/user.model.js"

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
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
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
export default passport