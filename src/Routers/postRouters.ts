import { Router } from "express";

import postControlers from "../Controlers/postControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.post("/post/add" , usersMiddleware([Role.Admin]) , postControlers.addPost) ;

router.post("/post/edit" , usersMiddleware([Role.Admin]) , postControlers.editPost) ;

router.post("/post/delete" , usersMiddleware([Role.Admin]) , postControlers.deletePost) ;

router.post("/post/get/all" , usersMiddleware([Role.Student , Role.Teacher , Role.Admin]) , postControlers.getPosts) ;

export default router ;