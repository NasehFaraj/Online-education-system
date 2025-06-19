import { Router } from "express" ;
import multer from "multer";


import fileControlers from "../Controlers/fileControlers" ;
import { Role } from "../enums/Role";
import { usersMiddleware } from "../Middlewares/usersMiddleware" ;

const router = Router() ;
const upload = multer({ storage: multer.memoryStorage() });

router.put("/file" , usersMiddleware([Role.Teacher , Role.Admin]) , upload.single('file') , fileControlers.uploadFile) ;

router.delete("/file" , usersMiddleware([Role.Teacher , Role.Admin]) , fileControlers.deleteFile) ;

router.get("/file" , usersMiddleware([Role.Teacher , Role.Admin , Role.Student]) , fileControlers.downloadFile) ;


export default router ; 