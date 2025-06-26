import { Router } from "express";

import blogControlers from "../Controlers/blogControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.put("/blog" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.addBlog) ;

router.patch("/blog" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.editBlog) ;

router.delete("/blog" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.deleteBlog) ;

router.get("/blog/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getBlogs) ;

router.get("/blog/my/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getMyBlogs) ; 

router.put("/blog/comment" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.addComment) ;

router.get("/blog/comment/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getComments) ; 

export default router ;