import mongoose from "mongoose";


export let connectDB = async() => { 

    try {
        
        await mongoose.connect(process.env.DATABASE_URL as string) ;
        console.log("Database is connected") ;

    } catch (error) {
        console.log(`Database error ${error}`) ;
        process.exit(1);
    }


};
