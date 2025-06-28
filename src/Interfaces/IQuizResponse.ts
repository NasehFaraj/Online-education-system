import { Types } from "mongoose";

export type QuestionWithoutAnswer = {
    text: string;
    options: string[];

};

export interface IQuizResponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    teacherID: Types.ObjectId;
    questions: QuestionWithoutAnswer[];
    createdAt?: Date;
    updatedAt?: Date;
}