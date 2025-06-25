import { Request , Response } from "express" ;

import { Blog } from "../Models/Blog";
import { Comment } from "../Models/Comment" ;

const addBlog =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , category } = req.body ;
    const { userID } = req.payload ;

    try {

        let newBlog = new Blog({
            BlogedBy: userID , 
            title ,
            article ,
            category 
        }) ;

        await newBlog.save() ;

        res.status(201).send({massage: "The Blog has been added successfully"}) ;

    } catch (error) {
        console.error('add Blog error:' , error) ;
        res.status(500).send({
            message: "add Blog process failed" ,
            error: error
        });
    }
   
} ;

const editBlog =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , category , blogID } = req.body ;


    try {

        let oldBlog = await Blog.findById(blogID) ;

        if(!oldBlog){
            res.status(401).send({massage: "Blog not found"}) ;
            return ;
        }

        await Blog.findByIdAndUpdate(blogID , {article , title , category}) ;

        res.status(201).send({massage: "The Blog has been edit successfully"}) ;

    } catch (error) {
        console.error('edit Blog error:' , error) ;
        res.status(500).send({
            message: "edit Blog process failed" ,
            error: error
        });
    }
   
    

} ;

const deleteBlog =  async (req : Request , res: Response) : Promise<void> => {
    
    const { blogID } = req.body ;

    try {
        
        const oldBlog = await Blog.findById(blogID) ;

        if(!oldBlog) {
            res.status(401).send({massage: "Blog not found"}) ;
            return ;
        }

        await Blog.findByIdAndDelete(blogID) ;

        res.status(201).send({massage: "The Blog has been delete successfully"}) ;

    } catch (error) {
        console.error('delete Blog error:' , error) ;
        res.status(500).send({
            message: "delete Blog process failed" ,
            error: error
        });
    }

} ;


const getBlogs =  async (req : Request , res: Response) : Promise<void> => {
    

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

        const blogs = await Blog.find().skip(skip).limit(limitNumber) ;

        res.status(201).send({blogs: blogs}) ;

    } catch (error) {
        console.error('get Blogs error:' , error) ;
        res.status(500).send({
            message: "get Blogs process failed" ,
            error: error
        });
    }


} ;


const addComment =  async (req : Request , res: Response) : Promise<void> => {
    
    const { blogID , comment } = req.body ;
    const { userID } = req.payload ;

    try {

        let newComment = new Comment({blogID , userID , comment}) ;

        await newComment.save() ;

        res.status(201).send({massage: "The Comment  has been added successfully"}) ;

    } catch (error) {
        console.error('add Comment  error:' , error) ;
        res.status(500).send({
            message: "add Comment  process failed" ,
            error: error
        });
    }
   
} ;


const getComments =  async (req : Request , res: Response) : Promise<void> => {
    

    const { page , limit , blogID } = req.query ;
    
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

        const comments = await Comment.find({blogID: blogID}).skip(skip).limit(limitNumber) ;

        res.status(201).send({comments: comments}) ;

    } catch (error) {
        console.error('get Comments error:' , error) ;
        res.status(500).send({
            message: "get Comments process failed" ,
            error: error
        });
    }


} ;


export default {
    
    addBlog ,
    editBlog ,
    deleteBlog , 
    getBlogs , 
    addComment , 
    getComments

}