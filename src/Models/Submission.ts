import { Schema , model , HydratedDocument , Types } from "mongoose";

interface ISubmission {

    _id: Types.ObjectId ;
    quizID: Types.ObjectId ;
    studentId: Types.ObjectId ;
    answers: number[] ;
    score?: number ;
    
}


type submissionDocument = HydratedDocument<ISubmission> ;

const submissionSchema = new Schema<submissionDocument>({
    
    quizID: {
        type: Schema.Types.ObjectId,
        ref: "User" , 
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User" , 
        required: true
    },
    answers: {
        type: [Number] ,
        required: true
    },
    score: {
        type: Number ,
        min: 0 ,
        max: 100
    }

}) ;


export const Submission = model<submissionDocument>("Submission" , submissionSchema);