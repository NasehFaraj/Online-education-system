import { Schema , model , HydratedDocument , Types } from "mongoose";

interface IPost {

    article: string ;
    photoPath: string ;
    
}


type postDocument = HydratedDocument<IPost> ;

const postSchema = new Schema<postDocument>({
    
    article: {
        type: String 
    } ,
    photoPath: {
        type: String 
    }

}) ;


export const submission = model<postDocument>("post" , postSchema);