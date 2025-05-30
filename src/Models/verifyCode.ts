import { HydratedDocument, Schema, model } from "mongoose";
import { TypeCode } from "../enums/TypeCode"; 

interface IVerifyCode {
    email: string ;
    code: number ;
    typeCode: TypeCode ;
    expiresAt: Date ;
}

type VerifyCodeDocument = HydratedDocument<IVerifyCode>;

const verifyCodeSchema = new Schema<VerifyCodeDocument>({
    email: {
        type: String ,
        required: true
    },
    code: {
        type: Number ,
        required: true
    },
    typeCode: {
        type: String ,
        enum: Object.values(TypeCode) ,
        required: true
    } ,
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 3600 * 1000) ,
        expires: 3600
    }
});

verifyCodeSchema.index({ email: 1 , typeCode: 1 } , { unique: true }) ;

export const verifyCode = model<VerifyCodeDocument>("verifyCode", verifyCodeSchema) ;