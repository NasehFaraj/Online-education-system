import { createTransport , Transporter } from 'nodemailer';
import winston from 'winston' ;
import dotenv from "dotenv" ;
import { google } from 'googleapis' ; 

dotenv.config() ;

const logger = winston.createLogger({
    level: 'debug' ,
    format: winston.format.json() ,
    transports: [new winston.transports.Console()]
}) ;

const oAuth2Client = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID ,
    process.env.MAIL_CLIENT_SECRET ,
    process.env.MAIL_REDIRECT_URL
) ;

oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN }) ;

export const sendEmail = async (from: string , to: string , subject: string , html: any) => {

    try {

        const accessToken = await oAuth2Client.getAccessToken() ;

        const transport: Transporter = createTransport({
            service:process.env.EMAIL_SERVICE ,
            auth: {
                type: 'OAuth2' ,
                user: process.env.MAIL_USERNAME , 
                clientId: process.env.MAIL_CLIENT_ID ,
                clientSecret: process.env.MAIL_CLIENT_SECRET ,
                refreshToken: process.env.MAIL_REFRESH_TOKEN ,
                accessToken: accessToken.token! ,
            }
        }); 

        const mailOptions = { 
            from: from ,
            to: to ,
            subject: subject ,
            html: html ,
        };

        logger.info(`Sending mail to - ${to}`) ;
        const info = await transport.sendMail(mailOptions) ; 
        logger.info('Email sent: ' + info.response) ;

        return info ;

    } catch (error) {
        logger.error('Email sending failed: ' + error) ;
        throw error ;
    }

};