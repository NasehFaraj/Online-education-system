import jwt from "jsonwebtoken" ;
import { Types } from "mongoose";

declare module 'jsonwebtoken' {
    export interface dataJwtPayload extends jwt.JwtPayload {
        userID : Types.ObjectId ,
        name : string ,
        email : string ,
        role : string 
    }
}