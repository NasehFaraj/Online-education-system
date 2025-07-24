import { payload } from "./IPayload";


declare global {

    namespace Express {

        interface Request {

            payload: payload ,
        
        }

    }
    
}