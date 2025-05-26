import express, { json } from "express" ;
import dotenv from "dotenv";
import { connectDB } from "./Database/connect";
import authRouters from "./Routers/authRouters";
import fileUploadRouters from "./Routers/fileUploadRouters" ;
import courseRouters from "./Routers/courseRouters" ;
import sendFileRouters from "./Routers/sendFileRouters" ;
import cors from "cors" ; 
 
const app = express() ;
dotenv.config() ;

connectDB() ;
app.use(json()) ;
app.use(cors()) ;
app.use(authRouters) ;
app.use(courseRouters) ;
app.use(sendFileRouters) ;
app.use(fileUploadRouters) ;

app.listen(process.env.PORT , (error) => {

    if(error)console.log(error) ;
    else console.log(`Server is running...`) ;

}) ;


