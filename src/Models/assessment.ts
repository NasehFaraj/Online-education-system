import { Schema , model , HydratedDocument , Types } from "mongoose";

interface IAssessment {
    title: string;
    description: string;
    courseId: Types.ObjectId;
    teacherId: Types.ObjectId;
    questions: {
        text: string;
        options: string[];
        correctAnswer: string;
    }[];
    dueDate: Date;
    submissions: {
        studentId: Types.ObjectId;
        answers: string[];
        score?: number;
    }[];
}

type AssessmentDocument = HydratedDocument<IAssessment>;

const assessmentSchema = new Schema<AssessmentDocument>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        questions: [{
            text: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true }
        }],
        dueDate: {
            type: Date,
            required: true
        },
        submissions: [{
            studentId: {
                type: Schema.Types.ObjectId,
                ref: "User", // يشير إلى الطالب
                required: true
            },
            answers: {
                type: [String],
                required: true
            },
            score: {
                type: Number,
                min: 0,
                max: 100
            }
        }]
    },
    { timestamps: true }
);

export const assessment = model<AssessmentDocument>("assessment", assessmentSchema);