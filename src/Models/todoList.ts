import { Schema , model , HydratedDocument } from "mongoose";


interface iTodoList {
    
    userID: Schema.Types.ObjectId ;
    quizID: Schema.Types.ObjectId ;

}

type todoListDocument = HydratedDocument<iTodoList>;

const todoListSchema = new Schema<todoListDocument>({
    
    userID: {
        type: Schema.Types.ObjectId 
    } ,
    quizID: {
        type: Schema.Types.ObjectId 
    }

}, { timestamps : true }) ;


export const todoList = model<todoListDocument>("todoList" , todoListSchema) ;