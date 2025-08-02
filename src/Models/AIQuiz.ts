import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Category } from "../enums/Category";

export interface IIAQuiz {

    _id: Types.ObjectId ;
    title: string;
    description: string; 
    category:  Category ;
    questions: {
        text: string;
        options: string[];
        correctAnswer: number ;
    }[];
    
}

type AIQuizDocument = HydratedDocument<IIAQuiz> ;

const AIQuizSchema = new Schema<AIQuizDocument>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String ,
            default: "" ,
            required: true
        },
         category: {
            type: String ,
            enum: Category ,
            required: true
        },
        questions: [{
            text: { type: String , required: true },
            options: { type: [String] , required: true },
            correctAnswer: { type: Number , required: true }
        }],
    },
    { timestamps: true }
);

export const AIQuiz = model<AIQuizDocument>("AIQuiz" , AIQuizSchema) ;