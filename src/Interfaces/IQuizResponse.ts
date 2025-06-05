import { IQuiz } from "../Models/Quiz"; 

type QuestionWithoutAnswer = Omit<IQuiz["questions"][number], "correctAnswer"> ;

export interface IQuizResponse extends Omit<IQuiz , "questions"> {
    questions: QuestionWithoutAnswer[] ;
}
