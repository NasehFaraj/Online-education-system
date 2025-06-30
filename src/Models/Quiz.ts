import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Category } from "../enums/Category";

export interface IQuiz {

    _id: Types.ObjectId ;
    title: string ;
    description: string ;
    category:  Category ;
    teacherID: Types.ObjectId;
    questions: {
        text: string;
        options: string[];
        correctAnswer: number ;
    }[];
    
}

type quizDocument = HydratedDocument<IQuiz> ;

const quizSchema = new Schema<quizDocument>(
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
        teacherID: {
            type: Schema.Types.ObjectId,
            ref: "User",
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

export const Quiz = model<quizDocument>("Quiz" , quizSchema) ;