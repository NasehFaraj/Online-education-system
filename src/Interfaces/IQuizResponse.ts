import { Types } from "mongoose";
import { Category } from "../enums/Category";

type QuestionWithoutAnswer = {
    text: string;
    options: string[];

};

export interface IQuizResponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    category:  Category ;
    teacherID: Types.ObjectId;
    questions: QuestionWithoutAnswer[];
    createdAt?: Date;
    updatedAt?: Date;
}