import { Request , Response } from "express";


const uploadFile =  async (req : Request , res: Response) : Promise<void> => {

    const { file } = req ;

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

} ;


export default {

    uploadFile ,

}