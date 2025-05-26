import { Router } from "express" ;
import { upload } from "../Services/uploadFile" ;
import { teacherMiddleware } from "../Middlewares/teacherMiddleware" ;
import fileUploadControlers from "../Controlers/fileUploadControlers" ;


const router = Router() ;

router.post("/upload" , teacherMiddleware , upload.single("file") , fileUploadControlers.uploadFile) ;

export default router ;