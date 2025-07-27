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

router.get("/blog/comment/number" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getNumberOfComments) ; 

router.put("/blog/vote/upvote" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.addUpvote) ;

router.delete("/blog/vote/upvote" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.deleteUpvote) ; 

router.get("/blog/vote/number" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , blogControlers.getNumberOfUpvotes) ; 

export default router ;