import { Request , Response } from "express";
import mongoose from "mongoose";

import { Quiz } from "../Models/Quiz" ;
import { TodoList } from "../Models/TodoList" ;
import { IQuizResponse } from "../Interfaces/IQuizResponse" ;
import { IAIQuizResponse } from "../Interfaces/IAIQuizResponse" ;
import { Submission } from "../Models/Submission" ;
import { GeneratedQuiz, generateQuiz } from "../Services/generationQuizByAIService" ;
import * as fileService from "../Services/fileService";
import { Lesson } from "../Models/Lesson" ;
import { AIQuiz } from "../Models/AIQuiz" ;
import { Role } from "../enums/Role";
import { AISubmission } from "../Models/AISubmission";


const addQuiz = async (req : Request , res: Response) : Promise<void> => { 

    const { title , description , category , questions  } = req.body ;
    const teacherID = req.payload.userID ;

    try {
        
        let newQuiz = new Quiz({ title , description , category , teacherID , questions }) ;

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

    const { quizID , title , description , category , questions  } = req.body ;
    const teacherID = req.payload.userID ;
    const { role } = req.payload ;

    try {

        let oldQuiz = await Quiz.findById(quizID) ;

        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID && role != Role.Admin){
            res.status(403).send({message: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Quiz.findByIdAndUpdate(quizID , { title , description , category , teacherID , questions  }) ;

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
    const { role } = req.payload ;
 
    try {

        let oldQuiz = await Quiz.findById(quizID);

        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        if(oldQuiz.teacherID != teacherID && role != Role.Admin){
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

    const { quizID } = req.query ;

    try {
        
        let oldQuiz = await Quiz.findById(quizID).select('-questions.correctAnswer') as IQuizResponse ;

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

        const quizzes = await Quiz.find().sort({createdAt: -1}).skip(skip).limit(limitNumber).select('-questions.correctAnswer').lean() as IQuizResponse[] ;

        res.status(201).send({quizzes}) ;

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

    const { userID } = req.payload ;
    
    try {

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

    let { answers , quizID } = req.body ;
    let { userID } = req.payload ;
    
    try {

        let sumOfDegree = 0 ;

        let oldQuiz = await Quiz.findById(quizID) ;
        
        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        let { questions } = oldQuiz ;
        let isCorrect: boolean[] = [] ;

        for (let i = 0; i < questions.length; i ++) {

            let check:boolean = answers[i] == questions[i].correctAnswer ;

            if(check)sumOfDegree ++ ;
            isCorrect.push(check) ;

        }

        let score = ((sumOfDegree / questions.length) * 100) | 0 ;
        
        let newSubmission = new Submission({
            quizID ,
            studentID: userID ,
            answers ,
            score
        })

        await newSubmission.save() ;

        res.status(201).send({score , isCorrect}) ;

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

        res.status(201).send({numberOfQuizzes}) ;

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

        let quizzes = await Quiz.find({teacherID: userID}).sort({createdAt: -1}).skip(skip).limit(limitNumber) ;
 
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
                
        const { questions } = await generateQuiz(fileBuffer) as GeneratedQuiz ;

        const newQuiz = new AIQuiz({title :oldLesson.title , description :oldLesson.description , questions}) ;

        await newQuiz.save() ;

        res.status(201).send({quiz: newQuiz as IAIQuizResponse}) ;

    } catch (error) {
        console.error('AI generate quiz error:' , error) ;
        res.status(500).send({
            message: "AI generate quiz process failed" ,
            error: error
        });
    }


} ;


const AISubmitSolution = async (req : Request , res: Response) : Promise<void> => { 

    let { answers , quizID } = req.body ;
    let { userID } = req.payload ;
    
    try {

        let sumOfDegree = 0 ;

        let oldQuiz = await AIQuiz.findById(quizID) ;
        
        if(!oldQuiz){
            res.status(401).send({message: "Quiz not found"}) ;
            return ;
        }

        let { questions } = oldQuiz ;
        let isCorrect: boolean[] = [] ;

        for (let i = 0; i < questions.length; i ++) {

            let check:boolean = answers[i] == questions[i].correctAnswer ;

            if(check)sumOfDegree ++ ;
            isCorrect.push(check) ;

        }

        let score = ((sumOfDegree / questions.length) * 100) | 0 ;
        
        let newSubmission = new AISubmission({
            quizID ,
            studentID: userID ,
            answers ,
            score
        })

        await newSubmission.save() ;

        res.status(201).send({score , isCorrect}) ;

    } catch (error) {
        console.error('submit solutiont error:' , error) ;
        res.status(500).send({
            message: "submit solution process failed" ,
            error: error
        });
    }

} ; 


const getMySubmission = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    
    try {
        
        let submissions = await Submission.find({studentID: userID}).sort({createdAt: -1}) ;

        res.status(201).send({submissions}) ;

    } catch (error) {
        console.error('get my submission error:' , error) ;
        res.status(500).send({
            message: "get my submission process failed" ,
            error: error
        });
    }

};


const getAIMySubmission = async (req : Request , res: Response) : Promise<void> => { 

    const { userID } = req.payload ;
    
    try {
        
        let submissions = await AISubmission.find({studentID: userID}).sort({createdAt: -1}) ;

        res.status(201).send({submissions}) ;

    } catch (error) {
        console.error('get my AI submission error:' , error) ;
        res.status(500).send({
            message: "get my AI submission process failed" ,
            error: error
        });
    }

};

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
    AISubmitSolution ,
    getMySubmission ,
    getAIMySubmission ,


}