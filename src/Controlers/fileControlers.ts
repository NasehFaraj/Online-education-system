import { Request, Response } from "express";
import mongoose from "mongoose";
import * as fileService from "../Services/fileService";


const uploadFile = async (req: Request, res: Response): Promise<void> => {

    let { userID } = req.payload;
    let { file } = req ;

    try {

        if (!file) {
            res.status(400).send({ error: "No file uploaded" }) ;
            return ;
        }

        const fileID = await fileService.uploadFile(file , {
            uploadedBy: userID ,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        });

        res.status(201).send({message: "File uploaded successfully", fileID});

    } catch (error) {
        console.error("Upload error:", error) ;
        res.status(500).send({ error: "Failed to upload file" }) ;
    }

};

const downloadFile = async (req: Request, res: Response): Promise<void> => {

    let { fileID } = req.query ;

    try {

        if ((typeof fileID !== 'string') || !mongoose.Types.ObjectId.isValid(fileID)) {
            res.status(400).send({ error: "Invalid file ID" });
            return ;
        }

        const objectFileID = new mongoose.Types.ObjectId(fileID);
        const fileInfo = await fileService.getFileInfo(objectFileID);

        if (!fileInfo) {
            res.status(404).send({ error: "File not found" });
            return;
        }

        const fileBuffer = await fileService.downloadFile(objectFileID);

        res.set({
            "Content-Type": fileInfo.metadata?.mimetype || "application/octet-stream",
            "Content-Length": fileInfo.length,
            "Content-Disposition": `attachment; filename="${fileInfo.filename}"`,
        });

        res.status(201).send(fileBuffer);

    } catch (error) {
        console.error("Download error:", error);
        res.status(500).send({ error: "Failed to download file" });
    }

};

const deleteFile = async (req: Request, res: Response): Promise<void> => {

    let { fileID } = req.body ;

    try {

        if (!mongoose.Types.ObjectId.isValid(fileID)) {
            res.status(400).send({ error: "Invalid file ID" });
            return ;
        }

        const objectFileID = new mongoose.Types.ObjectId(fileID);
        await fileService.deleteFile(objectFileID);

        res.status(201).send({ message: "File deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({ error: "Failed to delete file" });
    }

};

export default {
    uploadFile , 
    downloadFile , 
    deleteFile 
}