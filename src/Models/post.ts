import { Schema , model , HydratedDocument , Types } from "mongoose";

interface IPost {

    _id: Types.ObjectId ;
    postedBy: Schema.Types.ObjectId ;
    title: string ;
    article: string ;
    photoPath: string ;
    
}


type postDocument = HydratedDocument<IPost> ;

const postSchema = new Schema<postDocument>({

    postedBy : {
        type: Schema.Types.ObjectId , 
        required: true 
    } ,
    title: {
        type: String , 
        required: true 
    },
    article: {
        required: true ,
        type: String 
    } ,
    photoPath: {
        required: true ,
        type: String 
    }

}) ;


export const post = model<postDocument>("post" , postSchema);