import { Request , Response } from "express" ;

import { User } from "../Models/User";

const blockUser =  async (req : Request , res: Response) : Promise<void> => {
    
    let { userID } = req.body ;
    
    try {

        let oldUser = await User.findById(userID) ;

        if (!oldUser) {
            res.status(404).send({ message: "user not found" }) ;
            return ;
        }

        oldUser.isBlocked = true ;

        await oldUser.save() ;

        res.status(201).send({message: "user has been blocked"}) ;

    } catch (error) {
        console.error('block user error:', error) ;
        res.status(500).send({
            message: "block user process failed" ,
            error: error
        }) 
    }
   

} ;



const unblockUser =  async (req : Request , res: Response) : Promise<void> => {
    
    let { userID } = req.body ;
    
    try {

         let oldUser = await User.findById(userID) ;

        if (!oldUser) {
            res.status(404).send({ message: "user not found" }) ;
            return ;
        }

        oldUser.isBlocked = false ;

        await oldUser.save() ;

        res.status(201).send({message: "user has been blocked"}) ;

    } catch (error) {
        console.error('block user error:', error) ;
        res.status(500).send({
            message: "block user process failed" ,
            error: error
        }) 
    }
   

} ;



const getUsers =  async (req: Request<{} , {} , {} , { page?: string ; limit?: string ;} > , res: Response) : Promise<void> => {

    const { page , limit } = req.query ;

    try {
          
        if (typeof page !== 'string' || typeof limit !== 'string') {
            res.status(400).send({ error: "Page and limit must be strings" });
            return;
        }
        
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            res.status(400).send({ error: "Invalid pagination parameters" }) ;
            return ;
        }
        
        const skip = (pageNumber - 1) * limitNumber ;

        let users = await User.find().sort({createdAt: -1}).skip(skip).limit(limitNumber) ;

        
        res.status(201).send({users: users}) ;

    } catch (error) {
        console.error('get users error:' , error) ;
        res.status(500).send({
            message: "get users process failed" ,
            error: error
        });
    }

} ; 

const getNumberOfUser = async (req : Request , res: Response) : Promise<void> => {

    try {

        let numberOfUser  = await User.countDocuments() ;

        res.status(201).send({numberOfUser: numberOfUser}) ;

    } catch (error) {

        console.error('get number of users error:' , error) ;
        res.status(500).send({
            message: "get number of users process failed" ,
            error: error
        });

    }
    

} ; 


const changeName =  async (req : Request , res: Response) : Promise<void> => {
    
    let { name } = req.body ;
    let { userID } = req.payload ;
    
    try {

        let oldUser = await User.findById(userID) ;

        if (!oldUser) {
            res.status(404).send({ message: "user not found" }) ;
            return ;
        }

        oldUser.name = name ;

        await oldUser.save() ;

        res.status(201).send({message: "name has been changed"}) ;

    } catch (error) {
        console.error('changed name error:', error) ;
        res.status(500).send({
            message: "changed name process failed" ,
            error: error
        }) 
    }
   

} ;

const changePhoto =  async (req : Request , res: Response) : Promise<void> => {
    
    let { photoID } = req.body ;
    let { userID } = req.payload ;
    
    try {

        let oldUser = await User.findById(userID) ;

        if (!oldUser) {
            res.status(404).send({ message: "user not found" }) ;
            return ;
        }

        oldUser.photoID = photoID ;

        await oldUser.save() ;

        res.status(201).send({message: "photo has been changed"}) ;

    } catch (error) {
        console.error('changed photo error:', error) ;
        res.status(500).send({
            message: "change photo process failed" ,
            error: error
        }) 
    }
   

} ;


const changeRole =  async (req : Request , res: Response) : Promise<void> => {
    
    let { newRole , userID } = req.body ;
    
    try {

        let oldUser = await User.findById(userID) ;

        if (!oldUser) {
            res.status(404).send({ message: "user not found" }) ;
            return ;
        }

        oldUser.role = newRole ;

        await oldUser.save() ;

        res.status(201).send({message: "role has been changed"}) ;

    } catch (error) {
        console.error('changed role error:', error) ;
        res.status(500).send({
            message: "change role process failed" ,
            error: error
        }) 
    }
   

} ;


export default {
    
    blockUser ,
    getUsers , 
    getNumberOfUser , 
    unblockUser , 
    changeName , 
    changePhoto , 
    changeRole

}