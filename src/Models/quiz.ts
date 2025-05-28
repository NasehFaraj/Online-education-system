import { Schema , model , HydratedDocument , Types } from "mongoose";

interface IQuiz {
    title: string;
    description: string;
    courseID: Types.ObjectId;
    teacherID: Types.ObjectId;
    questions: {
        text: string;
        options: string[];
        correctAnswer: number ;
    }[];
    dueDate: Date;
    submissions: {
        studentId: Types.ObjectId;
        answers: number[];
        score?: number;
    }[];
}

type QuizDocument = HydratedDocument<IQuiz> ;

const quizSchema = new Schema<QuizDocument>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        courseID: {
            type: Schema.Types.ObjectId,
            ref: "Course",
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
        dueDate: {
            type: Date,
            required: true
        },
        submissions: [{
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
        }]
    },
    { timestamps: true }
);

export const quiz = model<QuizDocument>("quiz", quizSchema);