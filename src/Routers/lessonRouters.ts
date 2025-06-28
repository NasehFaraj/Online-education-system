import { Router } from "express";


import lessonControlers from "../Controlers/lessonControlers" ;
import { Role } from "../enums/Role" ;
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.put("/lesson" , usersMiddleware([Role.Teacher , Role.Admin]) , lessonControlers.addLesson) ;

router.patch("/lesson" , usersMiddleware([Role.Teacher , Role.Admin]) , lessonControlers.editLesson) ;

router.delete("/lesson" , usersMiddleware([Role.Teacher , Role.Admin]) , lessonControlers.deleteLesson) ;

router.get("/lesson" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLesson) ;

router.get("/lesson/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLessons) ;

router.get("/lesson/number" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getNumberOfLessons) ;

router.get("/lesson/my/all" , usersMiddleware([Role.Teacher , Role.Admin]) , lessonControlers.getMyLessons) ;

router.get("/lesson/my/number" , usersMiddleware([Role.Teacher , Role.Admin]) , lessonControlers.getNumberOfMyLessons) ;

router.put("/lesson/library" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.addLessonToLibrary) ;

router.delete("/lesson/library" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.deleteLessonFromLibrary) ;

router.get("/lesson/library/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLibrary) ;

router.get("/lesson/library/number" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getNumberOfLessonsAtLibrary) ;


export default router ;