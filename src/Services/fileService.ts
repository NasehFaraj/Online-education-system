import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";


const getBucket = () => {
    if (!mongoose.connection.db) {
        throw new Error("Database not initialized") ;
    }
    return new GridFSBucket(mongoose.connection.db , { bucketName: "uploads" }) ;
};

export const uploadFile = async (file: Express.Multer.File, metadata: object = {}) => {
    const bucket = getBucket();

    return new Promise<mongoose.Types.ObjectId>((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(file.originalname, { metadata });
        uploadStream.end(file.buffer);

        uploadStream.on("finish", () => resolve(uploadStream.id));
        uploadStream.on("error", (error) => {
            console.error("Upload stream error:", error);
            reject(new Error("Failed to upload file"));
        });
    });
};

export const downloadFile = async (fileId: mongoose.Types.ObjectId) => {
    const bucket = getBucket();
    const downloadStream = bucket.openDownloadStream(fileId);

    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        downloadStream.on("data", (chunk) => chunks.push(chunk));
        downloadStream.on("error", (error) => {
            console.error("Download stream error:", error);
            reject(new Error("Failed to download file"));
        });
        downloadStream.on("end", () => resolve(Buffer.concat(chunks)));
    });
};

export const getFileInfo = async (fileId: mongoose.Types.ObjectId) => {
    const bucket = getBucket();

    try {
        const files = await bucket.find({ _id: fileId }).toArray();
        return files[0] || null;
    } catch (error) {
        console.error("File info error:", error);
        throw new Error("Failed to get file info");
    }
};

export const deleteFile = async (fileId: mongoose.Types.ObjectId) => {
    const bucket = getBucket();

    try {
        await bucket.delete(fileId);
    } catch (error) {
        console.error("Delete error:", error);
        throw new Error("Failed to delete file");
    }
};