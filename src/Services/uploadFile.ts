import { Request , Response } from "express" ;
import multer from 'multer' ;
import { v4 as uuidv4 } from 'uuid' ;
import path from 'path' ;
import fs from 'fs' ;
import { fileURLToPath } from 'url' ;

const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;


const storage = multer.diskStorage({

    destination: (req , file , cb) => {

        let uploadPath = path.join(__dirname , "../../../persistent/uploads") ;
        console.log(uploadPath) ;
        
        if (file.mimetype.startsWith('video/')) {
            uploadPath = path.join(uploadPath , 'videos') ;
        } else if (file.mimetype === 'application/pdf') {
            uploadPath = path.join(uploadPath , 'pdfs') ;
        } else {
            return cb(new Error('The file type is not supported') , '') ;
        }

        fs.mkdirSync(uploadPath , { recursive: true }) ;
        cb(null , uploadPath) ;

    } ,
    filename: (req , file , cb) => {

        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}` ;
        cb(null, uniqueName) ;

    }

});

const fileFilter = (req: Request , file: Express.Multer.File , cb: any) => {

    const allowedTypes = [
        'video/mp4' ,
        'video/quicktime' ,
        'video/x-msvideo' ,
        'application/pdf'
    ] ;

    if (allowedTypes.includes(file.mimetype)) {
        cb(null , true) ;
    } else {
        cb(new Error('The file type is not supported (MP4 , MOV , AVI) or PDF') , false) ;
    }

};

export const upload = multer({

    storage ,
    fileFilter ,
    limits: { fileSize: 1024 * 1024 * 100 } 
    
});