import { Router } from "express";
import quizControlers from "../Controlers/quizControlers";
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { allUsersMiddleware } from "../Middlewares/allUsersMiddleware";

const router = Router() ;

router.put("/quiz" , teacherMiddleware , quizControlers.addQuiz) ;

router.patch("/quiz" , teacherMiddleware , quizControlers.editQuiz) ;

router.delete("/quiz" , teacherMiddleware , quizControlers.deleteQuiz) ;

router.get("/quiz/all" , allUsersMiddleware , quizControlers.getQuizs) ;

router.get("/quiz" , allUsersMiddleware , quizControlers.getQuiz) ;

router.put("/quiz/todo" , allUsersMiddleware , quizControlers.addQuizToTodoList) ;

router.delete("/quiz/todo/delete" , allUsersMiddleware , quizControlers.deleteQuizFromTodoList) ;

router.get("/quiz/todo/all" , allUsersMiddleware , quizControlers.getTodoList) ;

export default router ;