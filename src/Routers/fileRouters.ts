import { Router } from "express" ;
import { upload } from "../Services/uploadFile" ;
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import { allUsersMiddleware } from "../Middlewares/allUsersMiddleware";
import fileUploadControlers from "../Controlers/fileUploadControlers" ;
import sendFileControlers from "../Controlers/sendFileControlers" ;

const router = Router() ;

router.post("/file/upload" , teacherMiddleware , upload.single("file") , fileUploadControlers.uploadFile) ;

router.post("/file/stream" , allUsersMiddleware , sendFileControlers.streamFile) ;

export default router ; 