import { Schema , model , HydratedDocument , Types } from "mongoose";


interface iTodoList {

    _id: Types.ObjectId ;
    userID: Schema.Types.ObjectId ;
    quizID: Schema.Types.ObjectId ;
    date: Date ;

}

type todoListDocument = HydratedDocument<iTodoList>;

const todoListSchema = new Schema<todoListDocument>({
    
    userID: {
        type: Schema.Types.ObjectId ,
        equired: true 
    } ,
    quizID: {
        type: Schema.Types.ObjectId , 
        equired: true 
    } ,
    date: {
        type: Date ,
        equired: true 
    } 

}, { timestamps : true }) ;


export const todoList = model<todoListDocument>("todoList" , todoListSchema) ;