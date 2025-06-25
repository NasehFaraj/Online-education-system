import { Request , Response } from "express" ;

import { Post } from "../Models/Post";

const addPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , photoID } = req.body ;
    const { userID } = req.payload ;

    try {

        let newPost = new Post({
            postedBy: userID , 
            title ,
            article ,
            photoID 
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
   
} 

const editPost =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , postID , photoID } = req.body ;


    try {

        let oldPost = await Post.findById(postID) ;

        if(!oldPost){
            res.status(401).send({massage: "Post not found"}) ;
            return ;
        }

        await Post.findByIdAndUpdate(postID , {article , title , photoID}) ;

        res.status(201).send({massage: "The Post has been edit successfully"}) ;

    } catch (error) {
        console.error('edit Post error:' , error) ;
        res.status(500).send({
            message: "edit Post process failed" ,
            error: error
        });
    }
   
    

} 

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

} 


const getPosts =  async (req : Request , res: Response) : Promise<void> => {
    

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

        const posts = await Post.find().skip(skip).limit(limitNumber) ;

        res.status(201).send({posts: posts}) ;

    } catch (error) {
        console.error('get posts error:' , error) ;
        res.status(500).send({
            message: "get posts process failed" ,
            error: error
        });
    }


} 

const getPost =  async (req : Request , res: Response) : Promise<void> => {

    let { postID } = req.query ;


    try {

        const post = await Post.findById(postID) ;

        res.status(201).send({post: post}) ;

    } catch (error) {
        console.error('get post error:' , error) ;
        res.status(500).send({
            message: "get post process failed" ,
            error: error
        });
    }

} 


export default {
    
    addPost ,
    editPost ,
    deletePost , 
    getPosts , 
    getPost

}