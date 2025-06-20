import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Role } from "../enums/Role";
import { Gender } from "../enums/Gender";

interface iDefaultProfilePhoto {

    _id: Types.ObjectId ;
    role: Role ;
    gender: Gender ;
    photoID: Schema.Types.ObjectId ;
    
}

type DefaultProfilePhotoDocument = HydratedDocument<iDefaultProfilePhoto>;

const defaultProfilePhotoSchema = new Schema<DefaultProfilePhotoDocument>({

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
    photoID: {
        type: Schema.Types.ObjectId , 
        required: true
    }
    
}, { timestamps : true }) ;


export const DefaultProfilePhoto = model<DefaultProfilePhotoDocument>("defaultProfilePhoto" , defaultProfilePhotoSchema) ;