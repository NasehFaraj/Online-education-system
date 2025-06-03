import { Request , Response } from "express";
import fs from "fs" ;

const uploadFile =  async (req : Request , res: Response) : Promise<void> => {

    const { file } = req ;
    
    try {
        
        if (!file) {
            res.status(400).json({ error: 'No file uploaded' }) ;
            return ;
        }

        const fileType = file.mimetype.startsWith('video/') ? 'video' : 'pdf' ;
        
        res.json({
            message: 'Uploaded successfully' ,
            type: fileType ,
            path: file.path ,
            size: file.size
        }) ;
        
    } catch (error) {
        console.error('upload file error:' , error) ;
        res.status(500).send({
            message: "upload file process failed" ,
            error: error
        });
    }
   

} ;


const streamFile = async (req : Request , res: Response) : Promise<void> => {

    const { filePath } = req.body ;

    try {

        const readStream = fs.createReadStream(filePath) ;
        readStream.pipe(res) ;
    
    } catch (error) {
        console.error('stream file error:' , error) ;
        res.status(500).send({
            message: "stream file process failed" ,
            error: error
        });
    }


} ;



export default {

    uploadFile ,
    streamFile

}