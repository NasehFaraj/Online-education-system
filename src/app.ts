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
app.use(express.static(path.join(__dirname , '../../../test')));

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

const activeStreams: Record<string, string> = {}; // { streamId: broadcasterSocketId }

// app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('مستخدم متصل:', socket.id);

    socket.on('start-stream', (streamId) => {
        activeStreams[streamId] = socket.id;
        socket.join(streamId);
        console.log(`بث جديد بدأ: ${streamId}`);
    });

    socket.on('join-stream', (streamId) => {
        if (activeStreams[streamId]) {
            socket.join(streamId);
            socket.emit('stream-joined', streamId);
            console.log(`مشاهد انضم للبث: ${streamId}`);

            socket.to(activeStreams[streamId]).emit('new-viewer', socket.id);
        } else {
            socket.emit('stream-not-found', streamId);
        }
    });

    socket.on('offer', (data) => {
        socket.to(data.to).emit('offer', data);
    });

    socket.on('answer', (data) => {
        socket.to(data.to).emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.to).emit('ice-candidate', data);
    });

    socket.on('end-stream', (streamId) => {
        if (activeStreams[streamId] === socket.id) {
            delete activeStreams[streamId];
            socket.to(streamId).emit('stream-ended');
            console.log(`البث انتهى: ${streamId}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('مستخدم انقطع:', socket.id);

        for (const streamId in activeStreams) {
            if (activeStreams[streamId] === socket.id) {
                delete activeStreams[streamId];
                io.to(streamId).emit('stream-ended');
                console.log(`بث تلقائيًا انتهى: ${streamId}`);
            }
        }
    });
});

server.listen(process.env.PORT , async () => {

    await connectDB() ;

    console.log(`Server is running...`) ;

}) ;



