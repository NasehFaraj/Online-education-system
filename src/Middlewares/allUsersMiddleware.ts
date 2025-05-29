import { Request, Response, NextFunction } from 'express' ;
import jwt, { JwtPayload } from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;
import { payload } from '../Interfaces/payloadInterface';

dotenv.config() ;

export const allUsersMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token:string = req.headers.token as string ;
        const JWT_SECRET = process.env.JWT_SECRET ;
 
        if(!token){
            res.status(403).json({ 
                success: false ,
                message: 'token needed' 
            }) ;
            return ;
        }


        const decoded = jwt.verify(token , JWT_SECRET) ;

        if (typeof decoded === 'string' || !('role' in decoded)) {
            res.status(403).json({ 
                success: false ,
                message: 'Invalid token structure' 
            }) ;
            return ;
        }

        req.payload = decoded as payload ; 
        next() ; 

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ 
                success: false ,
                message: 'The token has expired' 
            }) ;
            return ;
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ 
                success: false ,
                message: 'Invalid token'  
            });
            return ;
        }

        console.error('Authentication error:', error);
        res.status(500).json({ 
            success: false ,
            message: 'Internal server error' 
        }) ;

    }

} ;