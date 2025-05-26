import { Router } from "express" ;
import authControlers from "../Controlers/authControlers" ;

const router = Router() ;

router.post("/signup" , authControlers.signup) ;

router.post("/verify" , authControlers.verifyEmail) ;

router.post("/login" , authControlers.login) ;

router.post("/send-code" , authControlers.sendCode) ;

router.post("/reset-password" , authControlers.resetPassword) ;

export default router ;