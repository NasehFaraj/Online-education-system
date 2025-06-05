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
        required: true
    } ,
    quizID: {
        type: Schema.Types.ObjectId , 
        required: true
    } ,
    date: {
        type: Date ,
        required: true
    } 

}, { timestamps : true }) ;


export const TodoList = model<todoListDocument>("TodoList" , todoListSchema) ;