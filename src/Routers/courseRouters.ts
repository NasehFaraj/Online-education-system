import { Router } from "express";


import courseControlers from "../Controlers/courseControlers" ;
import { Role } from "../enums/Role" ;
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.post("/course/add" , usersMiddleware([Role.Teacher]) , courseControlers.addCourse) ;

router.post("/course/edit" , usersMiddleware([Role.Teacher]) , courseControlers.editCourse) ;

router.post("/course/delete" , usersMiddleware([Role.Teacher]) , courseControlers.deleteCourse) ;

router.post("/course/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.getCourses) ;

router.post("/course/get" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.getCourse) ;

router.post("/course/get/my" , usersMiddleware([Role.Teacher]) , courseControlers.getMyCourses) ;

router.post("/course/get/my/number-of-courses" , usersMiddleware([Role.Teacher]) , courseControlers.getNumberOfMyCourses) ;

router.post("/course/get/number-of-courses" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.getNumberOfCourses) ;

router.post("/course/library/add" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.addCourseToLibrary) ;

router.post("/course/library/delete" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.deleteCourseFromLibrary) ;

router.post("/course/library/get/all" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.getLibrary) ;

router.post("/course/library/number-of-courses" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , courseControlers.getNumberOfCoursesAtLibrary) ;


export default router ;