import { Schema , model , HydratedDocument } from "mongoose";
import { Role } from "../enums/Role";
import { Gender } from "../enums/Gender";

interface iUser {
    name: string ;
    email: string ;
    password: string ;
    role: Role ;
    gender: Gender ;
    isVerified: boolean ;
    isBlocked: boolean ;
}

type UserDocument = HydratedDocument<iUser>;

const userSchema = new Schema<UserDocument>({
    name: {
        type: String ,
        required: true
    } ,
    email: {
        type: String ,
        required: true ,
        unique: true
    } ,
    password: {
        type: String ,
        required: true
    } ,
    role: {
        type: String ,
        enum: Role ,
        default: Role.Student
    } ,
    gender: {
        type: String ,
        enum: Gender ,
    } ,
    isVerified: {
        type: Boolean,
        default: false
    } ,
    isBlocked : {
        type : Boolean,
        default : false
    }
}, { timestamps : true }) ;


export const user = model<UserDocument>("user" , userSchema) ;