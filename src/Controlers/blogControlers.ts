import { Request , Response } from "express" ;

import { Blog } from "../Models/Blog";
import { Comment } from "../Models/Comment" ;
import { User } from "../Models/User";
import { Role } from "../enums/Role";
import { Vote } from "../Models/Vote";
import { VoteType } from "../enums/VoteType";

const addBlog =  async (req : Request , res: Response) : Promise<void> => {
    
    const { title , article , category } = req.body ;
    const { userID } = req.payload ;

    try {

        let newBlog = new Blog({
            blogedBy: userID , 
            title ,
            article ,
            category 
        }) ;

        await newBlog.save() ;

        res.status(201).send({message: "The Blog has been added successfully"}) ;

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
            res.status(401).send({message: "Blog not found"}) ;
            return ;
        }

        await Blog.findByIdAndUpdate(blogID , {article , title , category}) ;

        res.status(201).send({message: "The Blog has been edit successfully"}) ;

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
            res.status(401).send({message: "Blog not found"}) ;
            return ;
        }

        await Blog.findByIdAndDelete(blogID) ;

        res.status(201).send({message: "The Blog has been delete successfully"}) ;

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

        let blogs = await Blog.find().sort({createdAt: -1}).skip(skip).limit(limitNumber) ; 
        let bolgsRes = blogs.map(blog => Object.assign({} , blog.toObject() , {name: "name" , role: Role.Admin , photoID: "0"})) ; 

        for(let i = 0 ; i < blogs.length ; i ++){

            let oldUser = await User.findById(blogs[i].blogedBy) ;

            if(!oldUser) {
                bolgsRes[i].name = "Deleted Account" ;
                
            }
            else {
                bolgsRes[i].name = oldUser.name ;
                bolgsRes[i].role = oldUser.role ;
                bolgsRes[i].photoID = oldUser.photoID ;
            }

        }

        res.status(201).send({blogs: bolgsRes}) ;

    } catch (error) {
        console.error('get Blogs error:' , error) ;
        res.status(500).send({
            message: "get Blogs process failed" ,
            error: error
        });
    }


} ;


const getMyBlogs =  async (req : Request , res: Response) : Promise<void> => {
    

    const { page , limit } = req.query ;
    const { userID } = req.payload ;
    
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

        let blogs = await Blog.find({blogedBy: userID}).sort({createdAt: -1}).skip(skip).limit(limitNumber) ; 
        let bolgsRes = blogs.map(blog => Object.assign({} , blog.toObject() , {name: "name" , role: Role.Admin , photoID: "0"})) ; 

        for(let i = 0 ; i < blogs.length ; i ++){

            let oldUser = await User.findById(blogs[i].blogedBy) ;

            if(!oldUser) {
                bolgsRes[i].name = "Deleted Account" ;
                
            }
            else {
                bolgsRes[i].name = oldUser.name ;
                bolgsRes[i].role = oldUser.role ;
                bolgsRes[i].photoID = oldUser.photoID ;
            }

        }

        res.status(201).send({blogs: bolgsRes}) ;

    } catch (error) {
        console.error('get my Blogs error:' , error) ;
        res.status(500).send({
            message: "get my Blogs process failed" ,
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

        res.status(201).send({message: "The Comment  has been added successfully"}) ;

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

        const comments = await Comment.find({blogID: blogID}).sort({createdAt: -1}).skip(skip).limit(limitNumber) ;
        let commentsRes = comments.map(comment => Object.assign({} , comment.toObject() , {name: "name" , role: Role.Admin , photoID: "0"})) ; 

        for(let i = 0 ; i < comments.length ; i ++){

            let oldUser = await User.findById(comments[i].userID) ;

            if(!oldUser) {
                commentsRes[i].name = "Deleted Account" ;
                
            }
            else {
                commentsRes[i].name = oldUser.name ;
                commentsRes[i].role = oldUser.role ;
                commentsRes[i].photoID = oldUser.photoID ;
            }

        }

        res.status(201).send({comments: commentsRes}) ;

    } catch (error) {
        console.error('get Comments error:' , error) ;
        res.status(500).send({
            message: "get Comments process failed" ,
            error: error
        });
    }


} ;



const getNumberOfComments =  async (req : Request , res: Response) : Promise<void> => {
    

    const { blogID } = req.query ;
    
    try {
        
        let numberOfComments = await Comment.countDocuments({blogID: blogID}) ;
       
        res.status(201).send({numberOfComments: numberOfComments}) ;

    } catch (error) {
        console.error('get number of Comments error:' , error) ;
        res.status(500).send({
            message: "get number of Comments process failed" ,
            error: error
        });
    }


} ;


const addUpvote =  async (req : Request , res: Response) : Promise<void> => {
    

    const { blogID } = req.query ;
    const { userID } = req.payload ;
    
    try {
        
        await Vote.insertOne({userID , blogID , voteType: VoteType.Upvote}) ; 

        res.status(201).send({massage: "Upvote has been added"}) ;         

    } catch (error) {
        console.error('add upvote error:' , error) ;
        res.status(500).send({
            message: "add upvote process failed" ,
            error: error
        });
    }


} ;

const deleteUpvote =  async (req : Request , res: Response) : Promise<void> => {
    

    const { blogID } = req.query ;
    const { userID } = req.payload ;

    try {
        
        await Vote.findOneAndDelete({userID , blogID , voteType: VoteType.Upvote}) ; 

        res.status(201).send({massage: "Upvote has been deletee"}) ; 
        

    } catch (error) {
        console.error('delete upvote error:' , error) ;
        res.status(500).send({
            message: "delete upvote process failed" ,
            error: error
        });
    }


} ;

const getNumberOfUpvotes =  async (req : Request , res: Response) : Promise<void> => {
    

    const { blogID } = req.query ;
    
    try {
        
        let numberOfUpvotes  = await Vote.countDocuments({blogID: blogID}) ;
       
        res.status(201).send({numberOfUpvotes}) ;

    } catch (error) {
        console.error('get number of upvotes error:' , error) ;
        res.status(500).send({
            message: "get number of upvotes process failed" ,
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
    getComments , 
    getMyBlogs , 
    getNumberOfComments , 
    addUpvote , 
    deleteUpvote , 
    getNumberOfUpvotes

}