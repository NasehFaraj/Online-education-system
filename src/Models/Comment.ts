import { Schema , model , HydratedDocument , Types } from "mongoose";


export interface IComment {
    
    _id: Types.ObjectId ;
    userID: Schema.Types.ObjectId ;
    blogID: Schema.Types.ObjectId ;
    comment: string ; 

}

type commentDocument = HydratedDocument<IComment>;

const commentSchema = new Schema<commentDocument>({
    
    userID: {
        type: Schema.Types.ObjectId ,
        required: true 
    } ,
    blogID: {
        type: Schema.Types.ObjectId ,
        required: true
    } , 
    comment: {
        type: String ,
        required: true
    }

}, { timestamps : true }) ;


export const Comment = model<commentDocument>("Comment" , commentSchema) ;