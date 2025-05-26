import { payload } from "./payloadInterface";


declare global {

    namespace Express {

        interface Request {

            payload: payload ,
        
        }

    }
    
}