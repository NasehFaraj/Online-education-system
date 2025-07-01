import { Schema , model , HydratedDocument , Types } from "mongoose";
import { VoteType } from "../enums/VoteType";


export interface IVote {
    
    _id: Types.ObjectId ;
    userID: Schema.Types.ObjectId ;
    blogID: Schema.Types.ObjectId ;
    voteType: VoteType ; 

}

type VoteDocument = HydratedDocument<IVote>;

const VoteSchema = new Schema<VoteDocument>({
    
    userID: {
        type: Schema.Types.ObjectId ,
        required: true 
    } ,
    blogID: {
        type: Schema.Types.ObjectId ,
        required: true
    } , 
    voteType: {
        type: String ,
        enum: VoteType ,
        required: true
    }

}, { timestamps : true }) ;


export const Vote = model<VoteDocument>("Vote" , VoteSchema) ;