import { Router } from "express" ;


import authControlers from "../Controlers/authControlers" ;

const router = Router() ;

router.post("/auth/signup" , authControlers.signup) ;

router.post("/auth/verify-email" , authControlers.verifyEmail) ;

router.post("/auth/login" , authControlers.login) ;

router.post("/auth/send-code" , authControlers.sendCode) ;

router.post("/auth/reset-password" , authControlers.resetPassword) ;

export default router ;