import { Schema , model , HydratedDocument , Types } from "mongoose";


interface iLibrary {
    
    _id: Types.ObjectId ;
    userID: Schema.Types.ObjectId ;
    courseID: Schema.Types.ObjectId ;

}

type libraryDocument = HydratedDocument<iLibrary>;

const librarySchema = new Schema<libraryDocument>({
    
    userID: {
        type: Schema.Types.ObjectId ,
        required: true 
    } ,
    courseID: {
        type: Schema.Types.ObjectId ,
        required: true
    }

}, { timestamps : true }) ;


export const Library = model<libraryDocument>("Library" , librarySchema) ;