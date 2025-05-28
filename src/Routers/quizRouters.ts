import { Router } from "express";
import quizControlers from "../Controlers/quizControlers";
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { alllUsersMiddleware } from "../Middlewares/alllUsersMiddleware";

const router = Router() ;

router.post("/quiz/add" , teacherMiddleware , quizControlers.addQuiz) ;

router.post("/quiz/edit" , teacherMiddleware , quizControlers.editQuiz) ;

router.post("/quiz/delete" , teacherMiddleware , quizControlers.deleteQuiz) ;

router.post("/quiz/get/all" , alllUsersMiddleware , quizControlers.getQuizs) ;

router.post("/quiz/get" , alllUsersMiddleware , quizControlers.getQuiz) ;

router.post("/quiz/todo/add" , alllUsersMiddleware , quizControlers.addQuizToTodoList) ;

router.post("/quiz/todo/delete" , alllUsersMiddleware , quizControlers.deleteQuizFromTodoList) ;

router.post("/quiz/todo/get/all" , alllUsersMiddleware , quizControlers.getTodoList) ;

router.post("/quiz/submit" , alllUsersMiddleware , quizControlers.getTodoList) ;


export default router ;