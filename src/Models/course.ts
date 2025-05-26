import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Category } from "../enums/Category" ;

export interface ICourse {

    title: string ;
    description: string ;
    teacherID: Types.ObjectId ;
    category: Category ;
    studentsEnrolled?: Types.ObjectId[] ;
    videoPath?: string ;
    pdfPath?: string ;

}


type courseDocument = HydratedDocument<ICourse>;

const courseSchema = new Schema<courseDocument>(
    {
        title: {
            type: String ,
            required: true
        },
        description: {
            type: String ,
            required: true
        },
        teacherID: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        category: {
            type: String ,
            enum: Category ,
        },
        studentsEnrolled: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
        videoPath : {
            type: String ,
        } ,
        pdfPath : {
            type: String ,
        }
    },
    { timestamps: true }
);

export const course = model<courseDocument>("course", courseSchema);