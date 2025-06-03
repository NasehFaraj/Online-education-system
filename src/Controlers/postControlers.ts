import { Request , Response } from "express" ;
import fs from "fs" ;

import { post } from "../Models/post";
import { user } from "../Models/user";

const addPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , photoPath } = req.body ;
    const { userID } = req.payload ;

    try {

        let newPost = new post({
            postedBy: userID , 
            title ,
            article ,
            photoPath 
        }) ;

        await newPost.save() ;

        res.status(201).send({massage: "The post has been added successfully"}) ;

    } catch (error) {
        console.error('add post error:' , error) ;
        res.status(500).send({
            message: "add post process failed" ,
            error: error
        });
    }
   
} ;

const editPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , postID } = req.body ;


    try {

        let oldPost = await post.findById(postID) ;

        if(!oldPost){
            res.status(401).send({massage: "post not found"}) ;
            return ;
        }

        await post.findByIdAndUpdate(postID , {article , title}) ;

        res.status(201).send({massage: "The post has been edit successfully"}) ;

    } catch (error) {
        console.error('edit post error:' , error) ;
        res.status(500).send({
            message: "edit post process failed" ,
            error: error
        });
    }
   
    

} ;

const deletePost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { postID } = req.body ;

    try {
        
        const oldPost = await post.findById(postID) ;

        if(!oldPost) {
            res.status(401).send({massage: "post not found"}) ;
            return ;
        }

        if(oldPost.photoPath)fs.unlinkSync(oldPost.photoPath) ;

        await post.findByIdAndDelete(postID) ;

        res.status(201).send({massage: "The post has been delete successfully"}) ;

    } catch (error) {
        console.error('delete post error:' , error) ;
        res.status(500).send({
            message: "delete post process failed" ,
            error: error
        });
    }

} ;


const getPosts =  async (req : Request , res: Response) : Promise<void> => {
    

    const { page , limit } = req.body ;
    
    try {
        
        const skip = (page - 1) * limit ;

        const posts = await post.find().skip(skip).limit(limit) ;

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