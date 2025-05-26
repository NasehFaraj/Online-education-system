import { Types } from "mongoose" ;

export interface payload {
    userID : Types.ObjectId ,
    name : string ,
    email : string ,
    role : string 
}
