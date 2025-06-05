import { Router } from "express";

import userControlers from "../Controlers/userControlers";
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware";


const router = Router() ;

router.post("/user/block" , usersMiddleware([Role.Admin]) , userControlers.blockUser) ;



export default router ;