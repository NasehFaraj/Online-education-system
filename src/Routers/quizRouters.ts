import { Router } from "express";
import quizControlers from "../Controlers/quizControlers";
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { allUsersMiddleware } from "../Middlewares/allUsersMiddleware";

const router = Router() ;

router.post("/quiz/add" , teacherMiddleware , quizControlers.addQuiz) ;

router.post("/quiz/edit" , teacherMiddleware , quizControlers.editQuiz) ;

router.post("/quiz/delete" , teacherMiddleware , quizControlers.deleteQuiz) ;

router.post("/quiz/get/all" , allUsersMiddleware , quizControlers.getQuizzes) ;

router.post("/quiz/get" , allUsersMiddleware , quizControlers.getQuiz) ;

router.post("/course/get/number-of-quizes" , allUsersMiddleware , quizControlers.getNumberOfQuizes) ;

router.post("/quiz/submit-solution" , allUsersMiddleware , quizControlers.submitSolution) ;

router.post("/quiz/todo/add" , allUsersMiddleware , quizControlers.addQuizToTodoList) ;

router.post("/quiz/todo/delete" , allUsersMiddleware , quizControlers.deleteQuizFromTodoList) ;

router.post("/quiz/todo/get/all" , allUsersMiddleware , quizControlers.getTodoList) ;

export default router ;