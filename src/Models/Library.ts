import { Schema , model , HydratedDocument , Types } from "mongoose";


interface iLibrary {
    
    _id: Types.ObjectId ;
    userID: Schema.Types.ObjectId ;
    lessonID: Schema.Types.ObjectId ;

}

type libraryDocument = HydratedDocument<iLibrary>;

const librarySchema = new Schema<libraryDocument>({
    
    userID: {
        type: Schema.Types.ObjectId ,
        required: true 
    } ,
    lessonID: {
        type: Schema.Types.ObjectId ,
        required: true
    }

}, { timestamps : true }) ;


export const Library = model<libraryDocument>("Library" , librarySchema) ;