import { Schema , model , HydratedDocument , Types } from "mongoose";

interface IPost {

    _id: Types.ObjectId ;
    postedBy: Schema.Types.ObjectId ;
    title: string ;
    article: string ;
    photoID: string ;
    
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
    photoID: {
        type: String 
    }

}) ;


export const Post = model<postDocument>("Post" , postSchema);