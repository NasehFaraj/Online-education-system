import { Request , Response } from "express";
import mongoose from "mongoose";

import { Quiz } from "../Models/Quiz" ;
import { TodoList } from "../Models/TodoList" ;
import { IQuizResponse } from "../Interfaces/IQuizResponse" ;
import { Submission } from "../Models/Submission" ;
import { generateQuiz } from "../Services/generationQuizByAIService" ;
import * as fileService from "../Services/fileService";
import { Lesson } from "../Models/Lesson";
import { AIQuiz } from "../Models/AIQuiz";





const addQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { title , description  , questions  } = req.body ;
    const teacherID = req.payload.userID ;

    try {
        
        let newQuiz = new Quiz({ title , description  , teacherID , questions }) ;

        await newQuiz.save() ;

        res.status(201).send({message: "Quiz has been saved"}) ;

    } catch (error) {
        console.error('add Quiz error:' , error) ;
        res.status(500).send({
            message: "add Quiz process failed" ,
            error: error
        });
    }

} ;

const editQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID , title , description , questions  } = req.body ;
    const teacherID = req.payload.userID ;

    try {

        let oldQuiz = await Quiz.findById(quizID) ;

        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID){
            res.status(403).send({message: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Quiz.findByIdAndUpdate(quizID , { title , description , teacherID , questions  }) ;

        res.status(201).send({message: "Quiz has been edited"}) ;

    } catch (error) {
        console.error('edit Quiz error:' , error) ;
        res.status(500).send({
            message: "edit Quiz process failed" ,
            error: error
        });
    }

} ;

const deleteQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID } = req.body ;
    const teacherID = req.payload.userID ;

    try {

        let oldQuiz = await Quiz.findById(quizID);

        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID){
            res.status(403).send({message: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Quiz.findByIdAndDelete(quizID) ;

        res.status(201).send({message: "Quiz has been deleted"}) ;

    } catch (error) {
        console.error('delete Quiz error:' , error) ;
        res.status(500).send({
            message: "delete Quiz process failed" ,
            error: error
        });
    }

} ;

const getQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { quizID } = req.body ;

    try {
        
        let oldQuiz = await Quiz.findById(quizID) as IQuizResponse ;

        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        res.status(201).send({message: "get Quiz has been successful" , quiz: oldQuiz}) ;

    } catch (error) {
        console.error('get Quiz error:' , error) ;
        res.status(500).send({
            message: "get Quiz process failed" ,
            error: error
        });
    }

} ;

const getQuizzes = async (req : Request , res: Response) : Promise<void> => { 

    const { page , limit } = req.body ;

    try {
    
        const skip = (page - 1) * limit ;

        const quizes = await Quiz.find().sort({createdAt: -1}).skip(skip).limit(limit).select('-questions.correctAnswer').lean() as IQuizResponse[] ;

        res.status(201).send({quizes: quizes}) ;

    } catch (error) {
        console.error('get Quizzes error:' , error) ;
        res.status(500).send({
            message: "get Quizzes process failed" ,
            error: error
        });
    }
    

} ;

const addQuizToTodoList = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    const { quizID , date } = req.body ;

    let oldQuiz = await TodoList.findOne({quizID: quizID , userID: userID}) ;

    if(oldQuiz){
        res.status(401).send({message: "Quiz is already added"}) ;
        return ;
    }

    try {
        
        let newElement = new TodoList({
            userID: userID ,
            quizID: quizID ,
            date: date 
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

    let oldQuiz = await TodoList.findOne({quizID: quizID , userID: userID}) ;

    if(!oldQuiz){
        res.status(401).send({message: "Quiz not found"}) ;
        return ;
    }

    try {
        
        await TodoList.findOneAndDelete({quizID: quizID , userID: userID}) ;

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

    try {
        
        const { userID } = req.payload ;

        let myTodoList = await TodoList.find({userID: userID}).sort({createdAt: -1}) ;
    
        res.status(201).send({myTodoList: myTodoList}) ;

    } catch (error) {
        console.error('get todo list error:' , error) ;
        res.status(500).send({
            message: "get todo list process failed" ,
            error: error
        });
    }

    

} ;


const submitSolution = async (req : Request , res: Response) : Promise<void> => { 

    let { answers , courseID } = req.body ;
    let { userID } = req.payload ;
    
    try {

        let sumOfDegree = 0 ;

        let oldQuiz = await Quiz.findById(courseID) ;
        
        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        let { questions } = oldQuiz ;

        for (let i = 0; i < questions.length; i ++) {
            if(answers[i] == questions[i])sumOfDegree ++ ;
        }

        let score = ((sumOfDegree / questions.length) * 100) | 0 ;
        
        let newSubmission = new Submission({
            courseID ,
            studentId: userID ,
            answers ,
            score
        })

        await newSubmission.save() ;

        res.status(201).send({score: score}) ;

    } catch (error) {
        console.error('submit solutiont error:' , error) ;
        res.status(500).send({
            message: "submit solution process failed" ,
            error: error
        });
    }

} ; 


const getNumberOfQuizes = async (req : Request , res: Response) : Promise<void> => {

    try {

        let numberOfQuizzes = await Quiz.countDocuments() ;

        res.status(201).send({numberOfQuizzes: numberOfQuizzes}) ;

    } catch (error) {

        console.error('get number of Quizzes error:' , error) ;
        res.status(500).send({
            message: "get number of Quizzes process failed" ,
            error: error
        });

    }
    

} ; 



const getNumberOfMyQuizzes = async (req : Request , res: Response) : Promise<void> => {

    let { userID } = req.payload ;

    try {

        let numberOfQuizzes = await Quiz.countDocuments({teacherID: userID}) ;

        res.status(201).send({numberOfQuizzes: numberOfQuizzes}) ;

    } catch (error) {

        console.error('get number of quizzes at Library error:' , error) ;
        res.status(500).send({
            message: "get number of quizzes at Library process failed" ,
            error: error
        });

    }

}


const getMyQuizzes = async (req : Request , res: Response) : Promise<void> => {


    const { page , limit } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const skip = (page - 1) * limit ;

        let quizzes = await Quiz.find({teacherID: userID}).sort({createdAt: -1}).skip(skip).limit(limit) ;
 
        res.status(201).send({quizzes: quizzes}) ;

    } catch (error) {
        console.error('get quizzes error:' , error) ;
        res.status(500).send({
            message: "get quizzes process failed" ,
            error: error
        });
    }

}

const AIGenerateQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { lessonID } = req.query ;

    try {
        
        if ((typeof lessonID !== 'string') || !mongoose.Types.ObjectId.isValid(lessonID)) {
            res.status(400).send({ error: "Invalid file ID" });
            return ;
        }

        let oldLesson = await Lesson.findById(lessonID) ;

        if(!oldLesson){

            return ;
        }

        const objectFileID = new mongoose.Types.ObjectId(oldLesson.pdfID) ;
        const fileInfo = await fileService.getFileInfo(objectFileID);

        if (!fileInfo) {
            res.status(404).send({ error: "File not found" }) ;
            return ;
        }

        const fileBuffer = await fileService.downloadFile(objectFileID) ;
                
        const questions = await generateQuiz(fileBuffer) ;
        const newQuiz = new AIQuiz({title :oldLesson.title , description :oldLesson.description , questions}) ;

        await newQuiz.save() ;

        res.status(201).send({quiz: questions}) ;

    } catch (error) {
        console.error('AI generate quiz error:' , error) ;
        res.status(500).send({
            message: "AI generate quiz process failed" ,
            error: error
        });
    }


} ;



export default {

    addQuiz ,
    editQuiz ,
    deleteQuiz ,
    getQuiz ,
    getQuizzes ,
    addQuizToTodoList ,
    deleteQuizFromTodoList ,
    getTodoList , 
    submitSolution ,
    getNumberOfQuizes ,
    getNumberOfMyQuizzes , 
    getMyQuizzes , 
    AIGenerateQuiz ,

}