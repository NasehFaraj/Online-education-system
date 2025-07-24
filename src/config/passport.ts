import dotenv from 'dotenv';
import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';
import { User } from '../Models/User';
import { Request } from 'express'; 
import { Gender } from '../enums/Gender';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.MAIL_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET as string;
const CALLBACK_URL = process.env.CALLBACK_URL as string;

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        passReqToCallback: true,
    },
    async function (
        req: Request ,
        accessToken: string ,
        refreshToken: string ,
        profile: any ,
        done: VerifyCallback
    ) {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            } else {
                const user = await User.findOne({ googleId: profile.id });

                if (user) {
                    user.googleID = profile.id;
                    await user.save();
                    return done(null, user);
                } else {
                    const newUser = await User.create({
                        googleID: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value ,
                        gender: Gender.Female ,
                        password: "sdknfcwiojpiqwerojpfioqjpeofkp" 
                                    
                    });
                    return done(null, newUser);
                }
            }
        } catch (error) {
            return done(error as Error, false);
        }
    }
));

export default passport ;

