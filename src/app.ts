import express, { json } from "express" ;
import dotenv from "dotenv";
import cors from "cors" ; 

import { connectDB } from "./Database/connect";
import fileRouters from "./Routers/fileRouters" ;
import authRouters from "./Routers/authRouters" ;
import courseRouters from "./Routers/courseRouters" ;
import assessmentRouters from "./Routers/quizRouters" ;
 
const app = express() ;
dotenv.config() ;

connectDB() ;
app.use(json()) ;
app.use(cors()) ;
app.use(fileRouters) ;
app.use(authRouters) ;
app.use(courseRouters) ;
app.use(assessmentRouters) ;

app.listen(process.env.PORT , (error) => {

    if(error)console.log(error) ;
    else console.log(`Server is running...`) ;

}) ;


