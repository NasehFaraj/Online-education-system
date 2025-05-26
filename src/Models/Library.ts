import { Schema , model , HydratedDocument } from "mongoose";


interface iLibrary {
    
    userID: Schema.Types.ObjectId ;
    courseID: Schema.Types.ObjectId ;

}

type libraryDocument = HydratedDocument<iLibrary>;

const librarySchema = new Schema<libraryDocument>({
    
    userID: {
        type: Schema.Types.ObjectId 
    } ,
    courseID: {
        type: Schema.Types.ObjectId 
    }

}, { timestamps : true }) ;


export const library = model<libraryDocument>("library" , librarySchema) ;