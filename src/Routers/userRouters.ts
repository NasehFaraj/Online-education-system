import { Router } from "express";

import userControlers from "../Controlers/userControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.patch("/user/block" , usersMiddleware([Role.Admin]) , userControlers.blockUser) ;

router.patch("/user/unblock" , usersMiddleware([Role.Admin]) , userControlers.unblockUser) ;

router.get("/user/count" , usersMiddleware([Role.Admin]) , userControlers.getNumberOfUser) ;

router.get("/user" , usersMiddleware([Role.Admin]) , userControlers.getUsers) ;

router.patch("/user/change/role" , usersMiddleware([Role.Admin]) , userControlers.changeRole) ; 

router.patch("/user/change/name" , usersMiddleware([Role.Admin , Role.Teacher , Role.Student]) , userControlers.changeName) ; 

router.patch("/user/change/photo" , usersMiddleware([Role.Admin , Role.Teacher , Role.Student]) , userControlers.changePhoto) ; 

router.get("/user/info/my" , usersMiddleware([Role.Admin , Role.Teacher , Role.Student]) , userControlers.getMyInfo) ;

export default router ;