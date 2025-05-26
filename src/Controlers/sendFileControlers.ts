import { Request , Response } from "express" ;
import fs from "fs" ;


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
    streamFile 
} ;
