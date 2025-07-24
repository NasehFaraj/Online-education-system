import { Router } from "express" ;
import passport from "passport";
import jwt from "jsonwebtoken" ;


import authControlers from "../Controlers/authControlers" ;
import { Gender } from "../enums/Gender";

const router = Router() ;

router.post("/auth/signup" , authControlers.signup) ;

router.post("/auth/verify-email" , authControlers.verifyEmail) ;

router.post("/auth/login" , authControlers.login) ;

router.post("/auth/send-code" , authControlers.sendCode) ;

router.post("/auth/reset-password" , authControlers.resetPassword) ;

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login/failed',
        session: false
    }),
    (req, res) => {
        try {
            if (!req.user) {
                return res.redirect('/login/failed');
            }

            const user = req.user as any;
            
            const payload = {
                id: user._id, 
                name: user.name,
                email: user.email ,
                gender: Gender.Female ,
                password: "sdknfcwiojpiqwerojpfioqjpeofkp" 
            };

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            if (!process.env.FRONTEND_URL) {
                throw new Error('FRONTEND_URL غير معرّف في البيئة');
            }

            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`);
        } catch (error) {
            console.error('خطأ في callback:', error);
            res.redirect('/login/failed');
        }
    }
);

router.get('/login/failed', (req, res) => {
    res.status(401).json({ message: 'Login failed' });
});


export default router ;