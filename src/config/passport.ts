import dotenv from 'dotenv' ;
import passport from 'passport' ;
import { Strategy as GoogleStrategy , StrategyOptionsWithRequest, VerifyCallback, VerifyFunctionWithRequestAndParams } from 'passport-google-oauth2';
import { User } from '../Models/User' ;
import { Request } from 'express' ; 
import { randomBytes } from 'crypto' ;
import { hash } from "bcryptjs" ;
import { Gender } from '../enums/Gender';
import { payload } from '../Interfaces/IPayload';
import { Role } from '../enums/Role';
import { DefaultProfilePhoto } from '../Models/defaultProfilePhoto';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.MAIL_CLIENT_ID ;
const GOOGLE_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET  ;
const CALLBACK_URL = process.env.CALLBACK_URL ;


let options:StrategyOptionsWithRequest = {
    clientID: GOOGLE_CLIENT_ID || "" ,
    clientSecret: GOOGLE_CLIENT_SECRET || "" ,
    callbackURL: CALLBACK_URL || "" ,
    passReqToCallback: true ,
} ;


let verify:VerifyFunctionWithRequestAndParams = async (req: Request , accessToken: string , refreshToken: string , profile: any , done: VerifyCallback) => {
        
    try {

        let user = await User.findOne({ googleID: profile.id }) ;

        if (user) {

            let userInfo: payload = {
                userID: user.id ,
                role: user.role ,
                name: user.name ,
                email: user.email 
            }

            req.payload = userInfo ; 
            return done(null , user) ;
            
        }

        user = await User.findOne({ email: profile.emails?.[0]?.value }) ;

        if (user) {

            user.googleID = profile.id ;

            let userInfo: payload = {
                userID: user.id ,
                role: user.role ,
                name: user.name ,
                email: user.email 
            }

            await user.save() ;

            req.payload = userInfo ; 
            return done(null , user) ;
        } 


        let randomPassword: string = randomBytes(10).toString('hex').slice(0 , 10) ;
        let hashPassword: string = await hash(randomPassword , 12) ;
        const photo =  await DefaultProfilePhoto.find({role: Role.Student , gender: profile.gender || Gender.Male });

        const randomIndex = Math.floor(Math.random() * photo.length);
        console.log(photo[randomIndex].photoID) ;
        const randomPhotoID = photo[randomIndex].photoID ;

        const newUser = new User({

            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value ,
            gender: profile.gender || Gender.Male ,
            password: hashPassword , 
            photoID: randomPhotoID ,
            isVerified: true 
            
        }) ;

        
        let userInfo: payload = {
            userID: newUser.id ,
            role: newUser.role ,
            name: newUser.name ,
            email: newUser.email 
        }

        await newUser.save() ;

        req.payload = userInfo ; 
        return done(null , newUser) ;
            
    } catch (error) {
        return done(error as Error , false) ;
    }

} ;

let strategy = new GoogleStrategy(options , verify) ;

passport.use(strategy) ;

passport.serializeUser((user , done) => {
    done(null , user) ;
}) ;

passport.deserializeUser((user: Express.User, done) => {
    done(null , user) ;
}) ;

export default passport ;

