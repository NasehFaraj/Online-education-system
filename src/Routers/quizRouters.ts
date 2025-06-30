import { Router } from "express";


import quizControlers from "../Controlers/quizControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.put("/quiz" , usersMiddleware([Role.Teacher , Role.Admin]) , quizControlers.addQuiz) ;

router.patch("/quiz" , usersMiddleware([Role.Teacher , Role.Admin]) , quizControlers.editQuiz) ;

router.delete("/quiz" , usersMiddleware([Role.Teacher , Role.Admin]) , quizControlers.deleteQuiz) ;

router.get("/quiz/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getQuizzes) ;

router.get("/quiz" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getQuiz) ;

router.get("/quiz/number" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getNumberOfQuizes) ;

router.put("/quiz/submit-solution" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.submitSolution) ;

router.put("/quiz/todo" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.addQuizToTodoList) ;

router.delete("/quiz/todo" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.deleteQuizFromTodoList) ;

router.get("/quiz/todo/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.getTodoList) ;

router.get("/quiz/my" , usersMiddleware([Role.Teacher , Role.Admin]) , quizControlers.getMyQuizzes) ;

router.get("/quiz/my/number" , usersMiddleware([Role.Teacher , Role.Admin]) , quizControlers.getNumberOfMyQuizzes) ;

router.get("/quiz/AI/generate" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student])  , quizControlers.AIGenerateQuiz) ;

router.put("/quiz/AI/submit-solution" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , quizControlers.AISubmitSolution) ;

export default router ;