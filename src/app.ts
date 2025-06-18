import express, { json } from "express" ;
import dotenv from "dotenv";
import cors from "cors" ; 

import { connectDB } from "./Database/connect";
import postRouters from "./Routers/postRouters" ;
import userRouters from "./Routers/userRouters" ;
import fileRouters from "./Routers/fileRouters" ;
import authRouters from "./Routers/authRouters" ;
import blogRouters from "./Routers/blogRouters" ;
import quiztRouters from "./Routers/quizRouters" ;
import courseRouters from "./Routers/lessonRouters" ;
 
const app = express() ;
dotenv.config() ;

connectDB() ;
app.use(json()) ;
app.use(cors()) ;
app.use(postRouters) ;
app.use(fileRouters) ;
app.use(authRouters) ;
app.use(userRouters) ;
app.use(blogRouters) ;
app.use(quiztRouters) ;
app.use(courseRouters) ;

app.listen(process.env.PORT , (error) => {

    if(error)console.log(error) ;
    else console.log(`Server is running...`) ;

}) ;


