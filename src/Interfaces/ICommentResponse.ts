import { Role } from "../enums/Role";
import { IComment } from "../Models/Comment";


export interface ICommentResponse extends Omit<IComment , 'userID'> {
    name?: string ;       
    role?: Role ;       
    photoID?: string ;
}