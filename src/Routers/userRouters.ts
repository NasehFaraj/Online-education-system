import { Router } from "express";

import userControlers from "../Controlers/userControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.patch("/user/block" , usersMiddleware([Role.Admin]) , userControlers.blockUser) ;

router.get("/user/count" , usersMiddleware([Role.Admin]) , userControlers.getNumberOfUser) ;

router.get("/user" , usersMiddleware([Role.Admin]) , userControlers.getUsers) ;


export default router ;