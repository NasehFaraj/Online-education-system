import express, { json } from "express" ;
import { Server } from "socket.io" ;
import http from "http" ;
import path from "path";
import dotenv from "dotenv";
import cors from "cors" ; 


import { connectDB } from "./config/database";
import postRouters from "./Routers/postRouters" ;
import userRouters from "./Routers/userRouters" ;
import fileRouters from "./Routers/fileRouters" ;
import authRouters from "./Routers/authRouters" ;
import blogRouters from "./Routers/blogRouters" ;
import quiztRouters from "./Routers/quizRouters" ;
import lessonRouters from "./Routers/lessonRouters" ;
import { fileURLToPath } from "url";

const app = express() ;
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;


dotenv.config() ;
// app.use(express.static(path.join(__dirname , '../../../test')));

app.use(json()) ;
app.use(cors()) ;
app.use(postRouters) ;
app.use(fileRouters) ;
app.use(authRouters) ;
app.use(userRouters) ;
app.use(blogRouters) ;
app.use(quiztRouters) ;
app.use(lessonRouters) ;


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// let wCap = new cv.VideoCapture(0) ;
// wCap.set(cv.CAP_PROP_FRAME_WIDTH , 640) ;  
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT , 480) ; 
// wCap.set(cv.CAP_PROP_FPS, 15) ;            

// function getFrame() {

//     try {
//         const frame = wCap.read();

//         if (frame.empty) {
//             wCap.reset();
//             return getFrame();
//         }

//         const processedFrame = frame.cvtColor(cv.COLOR_BGR2RGB);

//         return processedFrame;
//     } catch (error) {
//         console.error('خطأ في قراءة الإطار:', error);
//         return new cv.Mat();
//     }

// }

// io.on('connection', (socket) => {

//     console.log('client is connected:', socket.id) ;

//     const interval = setInterval(() => {
//         try {
//             const frame = getFrame();

//             if (!frame.empty) {
//                 const jpgBuffer = cv.imencode('.jpg', frame).toString('base64');
//                 socket.emit('image', jpgBuffer);
//             }
//         } catch (error) {
//             console.error(error) ;
//         }
//     }, 100) ; 

//     socket.on('disconnect', () => {
//         console.log('client is disconnected:', socket.id);
//         clearInterval(interval);
//     }) ;
// }) ;

// process.on('SIGINT', () => {
//     wCap.release();
//     process.exit();
// });




server.listen(process.env.PORT , async () => {

    await connectDB() ;

    console.log(`Server is running...`) ;

}) ;



