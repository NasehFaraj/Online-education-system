import { Schema , model , HydratedDocument , Types } from "mongoose";

export interface IBlog {

    _id: Types.ObjectId ;
    title: string ;
    article: string ; 
    blogedBy: Types.ObjectId ;
    category?: string ;
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
            type: String 
        }
    },
    { timestamps: true }
);

export const Blog = model<blogDocument>("Blog", blogSchema) ;