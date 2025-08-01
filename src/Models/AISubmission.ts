import { Schema , model , HydratedDocument , Types } from "mongoose";

export interface IAISubmission {

    _id: Types.ObjectId ;
    quizID: Types.ObjectId ;
    studentID: Types.ObjectId ;
    answers: number[] ;
    score?: number ;
    
}


type AISubmissionDocument = HydratedDocument<IAISubmission> ;

const AISubmissionSchema = new Schema<AISubmissionDocument>({
    
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
    } ,
    { timestamps: true }
) ;


export const AISubmission = model<AISubmissionDocument>("AISubmission" , AISubmissionSchema);