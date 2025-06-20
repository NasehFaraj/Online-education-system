import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Role } from "../enums/Role";
import { Gender } from "../enums/Gender";

interface iUser {

    _id: Types.ObjectId ;
    name: string ;
    email: string ;
    password: string ;
    role: Role ;
    gender: Gender ;
    isVerified: boolean ;
    isBlocked: boolean ;
    photoID?: Types.ObjectId ,
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
        type: Schema.Types.ObjectId
    }
}, { timestamps : true }) ;


export const User = model<UserDocument>("User" , userSchema) ;