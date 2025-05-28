import express, { json } from "express" ;
import dotenv from "dotenv";
import cors from "cors" ; 

import { connectDB } from "./Database/connect";
import authRouters from "./Routers/authRouters";
import courseRouters from "./Routers/courseRouters" ;
import sendFileRouters from "./Routers/sendFileRouters" ;
import fileUploadRouters from "./Routers/fileUploadRouters" ;
import assessmentRouters from "./Routers/quizRouters" ;
 
const app = express() ;
dotenv.config() ;

connectDB() ;
app.use(json()) ;
app.use(cors()) ;
app.use(authRouters) ;
app.use(courseRouters) ;
app.use(sendFileRouters) ;
app.use(fileUploadRouters) ;
app.use(assessmentRouters) ;

app.listen(process.env.PORT , (error) => {

    if(error)console.log(error) ;
    else console.log(`Server is running...`) ;

}) ;


