import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Role } from "../enums/Role";
import { Gender } from "../enums/Gender";

interface iUser {

    _id: Types.ObjectId ;
    name: string ;
    email: string ;
    password: string ;
    googleID: string ;
    role: Role ;
    gender: Gender ;
    isVerified: boolean ;
    isBlocked: boolean ;
    photoID: string ,

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
    googleID : {
        type: String ,
    }, 
    role: {
        type: String ,
        enum: Role ,
        default: Role.Student
    } ,
    gender: {
        type: String ,
        enum: Gender ,
        required: true
    } ,
    isVerified: {
        type: Boolean,
        default: false
    } ,
    isBlocked : {
        type : Boolean,
        default : false
    } , 
    photoID: {
        type: String
    }
}, { timestamps : true }) ;


export const User = model<UserDocument>("User" , userSchema) ;