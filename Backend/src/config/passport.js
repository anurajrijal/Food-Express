import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User }from "../models/user.model.js"

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/v1/users/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            // If not, create a new user
            user = await User.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                role: 'user',
            });
        }

        // Generate Access and Refresh tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return done(null, { user, accessToken, refreshToken });
    } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, false);
    }
}));

// No need for serializeUser and deserializeUser as we are using JWT

export default passport;