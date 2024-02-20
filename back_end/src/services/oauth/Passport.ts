import passport from 'passport';
// var GoogleStrategy = require('passport-google-oauth20');
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserRepoInterface from "../../repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            callbackURL: "/passport/google/callback",
        },
        function (_accessToken: string, _refreshToken: string, profile: any, done: any) {
            // store token and token into db
            console.log('accessToken', _accessToken);
            console.log('refreshToken', _refreshToken);
            console.log('profile', profile);
            // const userRepo: UserRepoInterface = new UserRepo();
            // userRepo.createUser({
            //     email: profile.emails[0].value,
            //     name: profile.displayName,
            //     password: '',
            //     provider: 'google',
            //     providerId: profile.id,
            //     avatar: profile.photos[0].value
            // });
            done(null, profile); //done is callback function
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;