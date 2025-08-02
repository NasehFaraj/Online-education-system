import { Schema , model , HydratedDocument , Types } from "mongoose";

export interface ISubmission {

    _id: Types.ObjectId ;
    quizID: Types.ObjectId ;
    studentID: Types.ObjectId ;
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
        studentID: {
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
    },
    { timestamps: true }
) ;


export const Submission = model<submissionDocument>("Submission" , submissionSchema);