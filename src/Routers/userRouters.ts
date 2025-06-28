import { Router } from "express";

import userControlers from "../Controlers/userControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.patch("/user/block" , usersMiddleware([Role.Admin]) , userControlers.blockUser) ;

router.patch("/user/unblock" , usersMiddleware([Role.Admin]) , userControlers.unblockUser) ;

router.get("/user/count" , usersMiddleware([Role.Admin]) , userControlers.getNumberOfUser) ;

router.get("/user" , usersMiddleware([Role.Admin]) , userControlers.getUsers) ;

router.patch("/user/change/name" , usersMiddleware([Role.Admin]) , userControlers.changeName) ; 

router.patch("/user/change/photo" , usersMiddleware([Role.Admin]) , userControlers.changePhoto) ; 

export default router ;