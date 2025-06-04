import { Request , Response } from "express" ;
import { hash , compare } from "bcryptjs";
import { startSession } from "mongoose" ;
import { fileURLToPath } from 'url' ;
import { StringValue } from "ms" ;
import { Algorithm , SignOptions , JwtPayload } from "jsonwebtoken" ;
import jwt from "jsonwebtoken" ;
import ejs from "ejs" ;
import path from 'path';
import dotenv from 'dotenv' ;



import { user } from "../Models/user" ;
import { verifyCode } from "../Models/verifyCode" ;
import { sendEmail } from "../Services/mailService" ;
import { TypeCode } from "../enums/TypeCode" ;
import { error } from "console";

const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;

dotenv.config() ;

const signup = async (req : Request , res: Response) : Promise<void> => {

    const { email , name , password , role , gender } = req.body ;
    
    try {
    
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({ message: 'Email is already registered' }) ;
            return ;
        }
    
        const hashedPassword = await hash(password , 12) ;
    
        const newUser = new user({
            name: name ,
            email: email ,
            password: hashedPassword ,
            role : role ,
            gender : gender
        });
    
        const newCode:number = (Math.random() * (99999 - 10000) + 10000) | 0 ;
        const newVerifyCode = new verifyCode({
            email: email ,
            code: newCode ,
            typeCode: TypeCode.Verify ,
        }) ;
    
        const templatePath = path.join(__dirname , "../Views/emailTemplets/verify-email.ejs") ;
        const emailSubject = 'Email Verification' ;

        const session = await startSession() ;
        session.startTransaction() ;

        try {
            
            const htmlContent = await ejs.renderFile(templatePath , {emailSubject: emailSubject , name: name , code: newCode }) ;

            await sendEmail(process.env.MAIL_USERNAME || "" , email , emailSubject , htmlContent) ;

            await newUser.save() ;
            await newVerifyCode.save() ;
            res.status(201).json({ message: 'User created successfully' }) ;

            await session.commitTransaction() ;
            session.endSession() ;

        } catch (error) {
            await session.abortTransaction() ;
            console.error('Transaction Error:', error) ;
            res.status(500).json({ message: 'An error occurred during registration' }) ;
            session.endSession() ;
        } 
     

    } catch (error) {
        console.error('Signup Error:', error) ;
        res.status(500).json({ message: 'An error occurred during registration' }) ;
    }

};


const verifyEmail = async (req : Request , res: Response) : Promise<void> => {

    const { email , code } = req.body ;

    try {


        const oldUser = await user.findOne({ email:email }) ;
        if (!oldUser) {
            res.status(404).json({ message: "User not found" }) ;
            return ; 
        }

        const verificationCode = await verifyCode.findOne({ email: email , typeCode: "verify" }) ;
        if (!verificationCode || verificationCode.code != code) {
            res.status(401).json({ message: "Invalid verification code"}) ;
            return ;
        }

        const session = await startSession();
        session.startTransaction();

        try { 

            await verifyCode.findByIdAndDelete(verificationCode._id) ;
            await user.findByIdAndUpdate(oldUser._id , { isVerified: true }) ;

            res.status(200).json({message: "Email verified successfully"}) ;

            await session.commitTransaction() ;
          
        } catch (error) {
            await session.abortTransaction();
            console.error('Transaction Error:' , error) ;
            res.status(500).json({ message: 'An error occurred verifition' }) ;
        } finally { 
            session.endSession() ;
        }


    } catch (error) {
        console.error('Verification error:' , error) ;
        res.status(500).json({
            message: "Verification process failed" ,
            error: error
        });
    }
};



const login = async (req : Request , res: Response) : Promise<void> => {

    const { email , password } = req.body ;

    try {

        const oldUser = await user.findOne({ email:email }) ;
        
        if (!oldUser) {
            res.status(404).json({ message: "Email not registered" }) ;
            return ;
        }

        if (!oldUser.isVerified) {
            res.status(403).json({ message: "Account not verified" }) ;
            return ;
        }

        const isPasswordValid = await compare(password , oldUser.password) ;
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" }) ;
            return ;
        }

        if(!process.env.EXPIRESIN){
            throw new Error(".env.EXPIRESIN is not configured") ;
        }

        if(!process.env.JWT_SECRET){
            throw new Error(".env.JWT_SECRET is not configured") ;
        }

        const signOptions: SignOptions = {
            expiresIn: (process.env.EXPIRESIN as number | StringValue) || '1h' ,
            algorithm: (process.env.ALGORITHM as Algorithm) || 'HS256'
        };

        const payload: JwtPayload = {
            userID: oldUser._id ,
            email: oldUser.email ,
            name: oldUser.name ,
            role: oldUser.role
        } ;

        const token = jwt.sign(payload , process.env.JWT_SECRET , signOptions) ; 

        res.status(200).json({
            message: "Login successful" ,
            token:token ,
            isBlocked: oldUser.isBlocked
        });

    } catch (error) {
        console.error('Login error:', error) ;
        res.status(500).json({
            message: "Login process failed" ,
            error: error
        }) ;
    }
};

const sendCode = async (req : Request , res: Response) : Promise<void> => {

    const { email , typeCode } = req.body ;
  
    try {

        let oldUser = await user.findOne({email:email}) ;

        if(!oldUser){
            res.status(404).json({ message: "Email not registered" }) ;
            return ;
        }

        if(!oldUser.isVerified) {
            res.status(409).json({ message: 'Email is not Verified' }) ;
            return ;
        }

        await verifyCode.findOneAndDelete({email:email , typeCode:typeCode}) ;
        
        const newCode = (Math.random() * (99999 - 10000) + 10000) | 0 ;
        const newVerifyCode = new verifyCode({
            email: email ,
            code: newCode ,
            typeCode: typeCode ,
        }) ;
  
        await newVerifyCode.save() ;
  
        const templatePath = path.join(__dirname , "../Views/emailTemplets/verify-email.ejs") ;
        const emailSubject = (typeCode == TypeCode.Verify ? 'Email Verification' : 'Reset Password') ;

        const htmlContent = await ejs.renderFile(templatePath , { emailSubject:emailSubject,  name: oldUser.name , code: newCode }) ;

        await sendEmail(process.env.MAIL_USERNAME || "" , email , emailSubject , htmlContent) ;
        
        res.status(201).json({ message: "code resent successfully" }) ;

    } catch (error) {
        console.error('resend code Error:' , error) ;
        res.status(500).json({ message: 'An error occurred during resend code' }) ;
    }


} ; 


const resetPassword =  async (req : Request , res: Response) : Promise<void> => {

    const { email , code , newPassword } = req.body ;
    
    try {

        const oldUser = await user.findOne({ email:email }) ;
        if (!oldUser) {
            res.status(404).json({ message: "User not found" }) ;
            return ; 
        }

        if(oldUser.isVerified) {
            res.status(409).json({ message: 'Email is not Verified' }) ;
            return ;
        }

        const verificationCode = await verifyCode.findOne({ email: email}) ;
        if (!verificationCode || verificationCode.code != code) {
            res.status(401).json({ message: "Invalid verification code"}) ;
            return ;
        }

        const hashedPassword = await hash(newPassword , 12) ;

        const session = await startSession();
        session.startTransaction();

        try { 

            await verifyCode.findByIdAndDelete(verificationCode._id) ;
            await user.findByIdAndUpdate(oldUser._id , { password: hashedPassword}) ;
      

            const token = jwt.sign(
                {
                    userID: oldUser._id ,
                    email: oldUser.email ,
                    name: oldUser.name ,
                    role: oldUser.role
                } ,
                process.env.JWT_SECRET! ,
                {
                    expiresIn: '1h' ,
                    algorithm: 'HS256'
                }
            ) ;

            res.status(200).json({
                message: "Email verified successfully",
                token:token 
            }) ;

            await session.commitTransaction() ;
            session.endSession() ;

        } catch (error) {
            await session.abortTransaction();
            console.error('Transaction Error:' , error) ;
            res.status(500).json({ message: 'An error occurred reset password' }) ;
            session.endSession() ;
        } 


    } catch (error) {
        console.error('reset password error:' , error) ;
        res.status(500).json({
            message: "reset password process failed" ,
            error: error
        });
    }


} ;

export default {

    signup ,
    verifyEmail ,
    login ,
    sendCode ,
    resetPassword ,

} ;