import { Router } from "express";


import lessonControlers from "../Controlers/lessonControlers" ;
import { Role } from "../enums/Role" ;
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.post("/lesson/add" , usersMiddleware([Role.Teacher]) , lessonControlers.addLesson) ;

router.post("/lesson/edit" , usersMiddleware([Role.Teacher]) , lessonControlers.editLesson) ;

router.post("/lesson/delete" , usersMiddleware([Role.Teacher]) , lessonControlers.deleteLesson) ;

router.post("/lesson/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLessons) ;

router.post("/lesson/get" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLesson) ;

router.post("/lesson/get/my" , usersMiddleware([Role.Teacher]) , lessonControlers.getMyLessons) ;

router.post("/lesson/get/my/number-of-lessons" , usersMiddleware([Role.Teacher]) , lessonControlers.getNumberOfMyLessons) ;

router.post("/lesson/get/number-of-lessons" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getNumberOfLessons) ;

router.post("/lesson/library/add" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.addLessonToLibrary) ;

router.post("/lesson/library/delete" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.deleteLessonFromLibrary) ;

router.post("/lesson/library/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getLibrary) ;

router.post("/lesson/library/number-of-lessons" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , lessonControlers.getNumberOfLessonsAtLibrary) ;


export default router ;