import { IQuiz } from "../Models/quiz"; 

type QuestionWithoutAnswer = Omit<IQuiz["questions"][number], "correctAnswer"> ;

export interface IQuizResponse extends Omit<IQuiz , "questions"> {
    questions: QuestionWithoutAnswer[] ;
}
