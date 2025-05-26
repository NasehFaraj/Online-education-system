import { Router } from "express";
import courseControlers from "../Controlers/courseControlers" ;
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { alllUsersMiddleware } from "../Middlewares/alllUsersMiddleware";

const router = Router() ;

router.post("/course/add" , teacherMiddleware , courseControlers.addCourse) ;

router.post("/course/edit" , teacherMiddleware , courseControlers.editCourse) ;

router.post("/course/delete" , teacherMiddleware , courseControlers.deleteCourse) ;

router.post("/course/get/all" , alllUsersMiddleware , courseControlers.getCourses) ;

router.post("/course/get" , alllUsersMiddleware , courseControlers.getCourse) ;

router.post("/library/add" , alllUsersMiddleware , courseControlers.addCourseToLibrary) ;

router.post("/library/delete" , alllUsersMiddleware , courseControlers.deleteCourseFromLibrary) ;

router.post("/library/get/all" , alllUsersMiddleware , courseControlers.getLibrary) ;


export default router ;