import { Router } from "express";
import courseControlers from "../Controlers/courseControlers" ;
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { allUsersMiddleware } from "../Middlewares/allUsersMiddleware";

const router = Router() ;

router.post("/course/add" , teacherMiddleware , courseControlers.addCourse) ;

router.post("/course/edit" , teacherMiddleware , courseControlers.editCourse) ;

router.post("/course/delete" , teacherMiddleware , courseControlers.deleteCourse) ;

router.post("/course/get/all" , allUsersMiddleware , courseControlers.getCourses) ;

router.post("/course/get" , allUsersMiddleware , courseControlers.getCourse) ;

router.post("/course/get/number-of-courses" , allUsersMiddleware , courseControlers.getNumberOfCourses) ;

router.post("/course/library/add" , allUsersMiddleware , courseControlers.addCourseToLibrary) ;

router.post("/course/library/delete" , allUsersMiddleware , courseControlers.deleteCourseFromLibrary) ;

router.post("/course/library/get/all" , allUsersMiddleware , courseControlers.getLibrary) ;

router.post("/course/library/number-of-courses" , allUsersMiddleware , courseControlers.getNumberOfCoursesAtLibrary) ;


export default router ;