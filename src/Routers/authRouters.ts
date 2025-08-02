import { Router } from "express" ;
import passport from "passport";

import authControlers from "../Controlers/authControlers" ;

const router = Router() ;

router.post("/auth/signup" , authControlers.signup) ;

router.post("/auth/verify-email" , authControlers.verifyEmail) ;

router.post("/auth/login" , authControlers.login) ;

router.post("/auth/send-code" , authControlers.sendCode) ;

router.post("/auth/reset-password" , authControlers.resetPassword) ;

router.get("/auth/google" , passport.authenticate('google' , { scope: ['email', 'profile'] })) ;

router.get("/auth/google/callback" , passport.authenticate('google' , {failureRedirect: '/login/failed'}) , authControlers.OAuth2Google) ; 

router.get("/login/failed" , authControlers.OAuth2Failed) ;

export default router ;