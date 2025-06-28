import { Types } from "mongoose";

type QuestionWithoutAnswer = {
    text: string;
    options: string[];

};

export interface IAIQuizResponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    questions: QuestionWithoutAnswer[];
    createdAt?: Date;
    updatedAt?: Date;
}