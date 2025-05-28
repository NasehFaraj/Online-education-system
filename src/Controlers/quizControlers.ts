import { Request , Response } from "express";
import { quiz } from "../Models/quiz" ;
import { todoList } from "../Models/todoList" ;


const addQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { title , description , courseID , questions , dueDate } = req.body ;
    const teacherID = req.payload.userID ;

    try {
        
        let newQuiz = new quiz({ title , description , courseID , teacherID , questions , dueDate }) ;

        await newQuiz.save() ;

        res.status(201).send({massage: "quiz has been saved"}) ;

    } catch (error) {
        console.error('add quiz error:' , error) ;
        res.status(500).send({
            message: "add quiz process failed" ,
            error: error
        });
    }

} ;

const editQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID , title , description , courseID , questions , dueDate } = req.body ;
    const teacherID = req.payload.userID ;

    


    try {

        let oldQuiz = await quiz.findById(quizID) ;

        if(!oldQuiz){
            res.status(401).send({massage: "quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await quiz.findByIdAndUpdate(quizID , { title , description , courseID , teacherID , questions , dueDate }) ;

        res.status(201).send({massage: "quiz has been edited"}) ;

    } catch (error) {
        console.error('edit quiz error:' , error) ;
        res.status(500).send({
            message: "edit quiz process failed" ,
            error: error
        });
    }

} ;

const deleteQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID } = req.body ;
    const teacherID = req.payload.userID ;

    try {

        let oldQuiz = await quiz.findById(quizID) ;

        if(!oldQuiz){
            res.status(401).send({massage: "quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await quiz.findByIdAndDelete(quizID) ;

        res.status(201).send({massage: "quiz has been deleted"}) ;

    } catch (error) {
        console.error('delete quiz error:' , error) ;
        res.status(500).send({
            message: "delete quiz process failed" ,
            error: error
        });
    }

} ;

const getQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID } = req.body ;

    try {
        
        let oldQuiz = await quiz.findById(quizID) ;

        if(!oldQuiz){
            res.status(401).send({massage: "quiz not found"}) ;
            return ;
        }

        res.status(201).send({massage: "get quiz has been successful" , quiz: oldQuiz}) ;

    } catch (error) {
        console.error('delete quiz error:' , error) ;
        res.status(500).send({
            message: "delete quiz process failed" ,
            error: error
        });
    }

} ;

const getQuizs = async (req : Request , res: Response) : Promise<void> => { 

    const { page , limit } = req.body ;
    
    const skip = (page - 1) * limit ;

    const quizes = await quiz.find().skip(skip).limit(limit) ;

    res.status(201).send({quizes: quizes}) ;

} ;

const addQuizToTodoList = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    const { quizID } = req.body ;

    let oldQuiz = await todoList.findOne({quizID: quizID , userID: userID}) ;

    if(oldQuiz){
        res.status(401).send({massage: "Quiz is already added"}) ;
        return ;
    }

    try {
        
        let newElement = new todoList({
            userID: userID ,
            quizID: quizID
        }) ;

        await newElement.save() ;
        res.status(201).send({Message: "Quiz has been added to todo list"}) ;

        
    } catch (error) {
        console.error('add Quiz to todo list error:' , error) ;
        res.status(500).send({
            message: "add Quiz to todo list process failed" ,
            error: error
        });
    }

} ;

const deleteQuizFromTodoList = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    const { quizID } = req.body ;

    let oldQuiz = await todoList.findOne({quizID: quizID , userID: userID}) ;

    if(!oldQuiz){
        res.status(401).send({massage: "Quiz not found"}) ;
        return ;
    }

    try {
        
        await todoList.findOneAndDelete({quizID: quizID , userID: userID}) ;

        res.status(201).send({Message: "Quiz has been deleted from todo list"}) ;

        
    } catch (error) {
        console.error('delete Quiz from todo list error:' , error) ;
        res.status(500).send({
            message: "delete Quiz from todo list process failed" ,
            error: error
        });
    }

} ;

const getTodoList = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    
    let myTodoList = await todoList.find({userID: userID}) ;
    
    res.status(201).send({myTodoList: myTodoList}) ;

} ;


const submitSolution = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    
    let myTodoList = await todoList.find({userID: userID}) ;
    
    res.status(201).send({myTodoList: myTodoList}) ;

} ;


export default {

    addQuiz ,
    editQuiz ,
    deleteQuiz ,
    getQuiz ,
    getQuizs ,
    addQuizToTodoList ,
    deleteQuizFromTodoList ,
    getTodoList , 
    submitSolution

}