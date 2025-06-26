import { Role } from "../enums/Role";
import { IBlog } from "../Models/Blog";


export interface IBlogResponse extends Omit<IBlog , 'blogedBy'> {
    name?: string ;       
    role?: Role ;       
    photoID?: string ;
}