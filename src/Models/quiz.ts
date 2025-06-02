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
}

type quizDocument = HydratedDocument<IQuiz> ;

const quizSchema = new Schema<quizDocument>(
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
        }
    },
    { timestamps: true }
);

export const quiz = model<quizDocument>("quiz" , quizSchema) ;