import { Router } from "express" ;


import fileControlers from "../Controlers/fileControlers" ;
import { Role } from "../enums/Role";
import { upload } from "../Services/uploadFile" ;
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;

router.put("/file/upload" , usersMiddleware([Role.Teacher]) , upload.single("file") , fileControlers.uploadFile) ;

router.post("/file/stream" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , fileControlers.streamFile) ;

export default router ; 