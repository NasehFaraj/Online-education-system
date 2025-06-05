import { Request , Response } from "express" ;
import fs from "fs" ;

import { Post } from "../Models/Post";

const addPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , photoPath } = req.body ;
    const { userID } = req.payload ;

    try {

        let newPost = new Post({
            PostedBy: userID , 
            title ,
            article ,
            photoPath 
        }) ;

        await newPost.save() ;

        res.status(201).send({massage: "The Post has been added successfully"}) ;

    } catch (error) {
        console.error('add Post error:' , error) ;
        res.status(500).send({
            message: "add Post process failed" ,
            error: error
        });
    }
   
} ;

const editPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , postID } = req.body ;


    try {

        let oldPost = await Post.findById(postID) ;

        if(!oldPost){
            res.status(401).send({massage: "Post not found"}) ;
            return ;
        }

        await Post.findByIdAndUpdate(postID , {article , title}) ;

        res.status(201).send({massage: "The Post has been edit successfully"}) ;

    } catch (error) {
        console.error('edit Post error:' , error) ;
        res.status(500).send({
            message: "edit Post process failed" ,
            error: error
        });
    }
   
    

} ;

const deletePost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { postID } = req.body ;

    try {
        
        const oldPost = await Post.findById(postID) ;

        if(!oldPost) {
            res.status(401).send({massage: "Post not found"}) ;
            return ;
        }

        await Post.findByIdAndDelete(postID) ;

        res.status(201).send({massage: "The Post has been delete successfully"}) ;

    } catch (error) {
        console.error('delete Post error:' , error) ;
        res.status(500).send({
            message: "delete Post process failed" ,
            error: error
        });
    }

} ;


const getPosts =  async (req : Request , res: Response) : Promise<void> => {
    

    const { page , limit } = req.body ;
    
    try {
        
        const skip = (page - 1) * limit ;

        const posts = await Post.find().skip(skip).limit(limit) ;

        res.status(201).send({posts: posts}) ;

    } catch (error) {
        console.error('get posts error:' , error) ;
        res.status(500).send({
            message: "get posts process failed" ,
            error: error
        });
    }


} ;


export default {
    
    addPost ,
    editPost ,
    deletePost , 
    getPosts

}