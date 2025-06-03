import { Router } from "express";


import quizControlers from "../Controlers/quizControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.post("/quiz/add" , usersMiddleware([Role.Teacher]) , quizControlers.addQuiz) ;

router.post("/quiz/edit" , usersMiddleware([Role.Teacher]) , quizControlers.editQuiz) ;

router.post("/quiz/delete" , usersMiddleware([Role.Teacher]) , quizControlers.deleteQuiz) ;

router.post("/quiz/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getQuizzes) ;

router.post("/quiz/get" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getQuiz) ;

router.post("/course/get/number-of-quizes" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getNumberOfQuizes) ;

router.post("/quiz/submit-solution" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.submitSolution) ;

router.post("/quiz/todo/add" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.addQuizToTodoList) ;

router.post("/quiz/todo/delete" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.deleteQuizFromTodoList) ;

router.post("/quiz/todo/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getTodoList) ;

export default router ;