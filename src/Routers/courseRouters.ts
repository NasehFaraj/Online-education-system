import { Router } from "express";
import courseControlers from "../Controlers/courseControlers" ;
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { allUsersMiddleware } from "../Middlewares/allUsersMiddleware";

const router = Router() ;

router.put("/course" , teacherMiddleware , courseControlers.addCourse) ;

router.patch("/course/edit" , teacherMiddleware , courseControlers.editCourse) ;

router.delete("/course/delete" , teacherMiddleware , courseControlers.deleteCourse) ;

router.get("/course/all" , allUsersMiddleware , courseControlers.getCourses) ;

router.get("/course/get" , allUsersMiddleware , courseControlers.getCourse) ;

router.put("/course/library" , allUsersMiddleware , courseControlers.addCourseToLibrary) ;

router.delete("/course/library" , allUsersMiddleware , courseControlers.deleteCourseFromLibrary) ;

router.get("/course/library/all" , allUsersMiddleware , courseControlers.getLibrary) ;


export default router ;