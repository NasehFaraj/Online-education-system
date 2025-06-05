import { Router } from "express";

import blogControlers from "../Controlers/blogControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.post("/blog/add" , usersMiddleware([Role.Admin]) , blogControlers.addBlog) ;

router.post("/blog/edit" , usersMiddleware([Role.Admin]) , blogControlers.editBlog) ;

router.post("/blog/delete" , usersMiddleware([Role.Admin]) , blogControlers.deleteBlog) ;

router.post("/blog/get/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getBlogs) ;

router.post("/blog/comment/add" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.addComment) ;

router.post("/blog/comment/get/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getComments) ;

export default router ;