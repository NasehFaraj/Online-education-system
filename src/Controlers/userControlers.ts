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

        res.status(201).send({massage: "user has been blocked"}) ;

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

        res.status(201).send({massage: "user has been blocked"}) ;

    } catch (error) {
        console.error('block user error:', error) ;
        res.status(500).send({
            message: "block user process failed" ,
            error: error
        }) 
    }
   

} ;



const getUsers =  async (req: Request<{} , {} , {} , { page?: string ; limit?: string ;} > , res: Response) : Promise<void> => {

    const page = parseInt(req.query.page || '1', 10) ;
    const limit = parseInt(req.query.limit || '10', 10) ;

    try {
        
        const skip = (page - 1) * limit ;

        let users = await User.find().skip(skip).limit(limit) ;

        
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

        res.status(201).send({massage: "name has been changed"}) ;

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

        res.status(201).send({massage: "photo has been changed"}) ;

    } catch (error) {
        console.error('changed photo error:', error) ;
        res.status(500).send({
            message: "photo name process failed" ,
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
    changePhoto

}