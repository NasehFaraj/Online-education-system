import { Router } from "express" ;
import { alllUsersMiddleware } from "../Middlewares/alllUsersMiddleware";
import sendFileControlers from "../Controlers/sendFileControlers" ;

const router = Router() ;

router.post("/file/stream" , alllUsersMiddleware , sendFileControlers.streamFile) ;


export default router ;