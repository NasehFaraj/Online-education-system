import { Schema , model , HydratedDocument , Types } from "mongoose";
import { Category } from "../enums/Category" ;
import { Level } from "../enums/Level";

export interface ILesson {

    _id: Types.ObjectId ;
    title: string ;
    description: string ;
    teacherID: Types.ObjectId ;
    category: Category ;
    level: Level ;
    studentsEnrolled?: Types.ObjectId[] ;
    videoID?: string ;
    pdfID?: string ;
    createdAt: Date ;
    updatedAt: Date ;

}


type lessonDocument = HydratedDocument<ILesson>;

const lessonSchema = new Schema<lessonDocument>(
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
            required: true
        },
        studentsEnrolled: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
        videoID : {
            type: String ,
        } ,
        pdfID : {
            type: String ,
        } ,
        level : {
            type : String ,
            enum : Level , 
            required: true
        }
    },
    { timestamps: true }
);

export const Lesson = model<lessonDocument>("Lesson", lessonSchema);