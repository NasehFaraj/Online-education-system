import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Category } from "../enums/Category" ;

export interface IBlog {

    _id: Types.ObjectId ;
    title: string ;
    article: string ; 
    blogedBy: Types.ObjectId ;
    category?: Category ;
    createdAt: Date ;
    updatedAt: Date ;

}


type blogDocument = HydratedDocument<IBlog> ;

const blogSchema = new Schema<blogDocument>(
    {
        title: {
            type: String ,
            required: true
        },
        blogedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        article: {
            type: String , 
            required: true 
        } ,
        category: {
            type: String ,
            enum: Category ,
        }
    },
    { timestamps: true }
);

export const Blog = model<blogDocument>("Blog", blogSchema) ;