import { StringValue } from "ms" ; 
import { Algorithm } from "jsonwebtoken" ;

declare namespace NodeJS {
    export interface ProcessEnv {
        
        [key : string] : string | number | StringValue | undefined ;
        DATABASE_URL: string ;
        PORT : string ;
        JWT_SECRET : string ;
        MAIL_USERNAME : string ;
        MAIL_HOST : string ;
        EMAIL_SERVICE : string ;
        MAIL_CLIENT_ID : string ; 
        MAIL_CLIENT_SECRET : string ;
        MAIL_REFRESH_TOKEN : string ;
        MAIL_REDIRECT_URL : string ;
        MAIL_PASSWORD : string ;
        ALGORITHM : Algorithm | undefined ;
        EXPIRESIN : number | StringValue | undefined ;
        
    }

}

