import { Router } from "express";

import postControlers from "../Controlers/postControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.put("/post" , usersMiddleware([Role.Admin]) , postControlers.addPost) ;

router.patch("/post" , usersMiddleware([Role.Admin]) , postControlers.editPost) ;

router.delete("/post" , usersMiddleware([Role.Admin]) , postControlers.deletePost) ;

router.get("/post/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , postControlers.getPosts) ;

router.get("/post" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , postControlers.getPost) ;

export default router ;