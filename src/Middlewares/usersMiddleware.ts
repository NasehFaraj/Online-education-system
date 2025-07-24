import { Request, Response, NextFunction } from 'express' ;
import jwt from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;
import { Role } from '../enums/Role' ;
import { payload } from '../Interfaces/IPayload';

dotenv.config() ;

export const usersMiddleware = (roles: Role[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

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


            const decoded = jwt.verify(token , JWT_SECRET as jwt.Secret | jwt.PublicKey) ;

            if (typeof decoded === 'string' || !('role' in decoded)) {
                res.status(403).json({ 
                    success: false ,
                    message: 'Invalid token structure' 
                }) ;
                return ;
            }

            const { role } = decoded  ;
          
            if (!roles.includes(role)) {
                res.status(403).json({ 
                    success: false ,
                    message: 'Unauthorized' 
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
    } 
};