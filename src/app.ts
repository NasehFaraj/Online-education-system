import express, { json } from "express" ;
import dotenv from "dotenv";
import cors from "cors" ; 
import session from "express-session";

import passport from "./config/passport" ;
import { connectDB } from "./config/database";
import postRouters from "./Routers/postRouters" ;
import userRouters from "./Routers/userRouters" ;
import fileRouters from "./Routers/fileRouters" ;
import authRouters from "./Routers/authRouters" ;
import blogRouters from "./Routers/blogRouters" ;
import quiztRouters from "./Routers/quizRouters" ;
import lessonRouters from "./Routers/lessonRouters" ;

const app = express() ;

dotenv.config() ;

app.use(json()) ;
app.use(cors()) ;
    

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret' ,
    resave: false ,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(postRouters) ;
app.use(fileRouters) ;
app.use(authRouters) ;
app.use(userRouters) ;
app.use(blogRouters) ;
app.use(quiztRouters) ;
app.use(lessonRouters) ;

app.listen(process.env.PORT , async () => {

    await connectDB() ;

    console.log(`Server is running...`) ;

}) ;

