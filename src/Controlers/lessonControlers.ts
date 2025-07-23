import { Request , Response } from "express";

import { Lesson } from "../Models/Lesson" ;
import { Library } from "../Models/Library" ;
import { ILesson } from "../Models/Lesson" ;

const addLesson =  async (req : Request , res: Response) : Promise<void> => {

    const { title , description , category , videoID , pdfID , level } = req.body ;
    const { userID } = req.payload ;

    try {

        let newLesson = new Lesson ({title , teacherID: userID , category , description , videoID , pdfID , level}) ;

        newLesson.save() ;
        
        res.status(201).send({message: "The Lesson has been added successfully"}) ;

    } catch (error) {
        console.error('add Lesson error:' , error) ;
        res.status(500).send({
            message: "add Lesson process failed" ,
            error: error
        });
    }


} ;

const editLesson =  async (req : Request , res: Response) : Promise<void> => {

    const { lessonID , title , description , category , videoID , pdfID , level } = req.body ;
    const { userID } = req.payload ;

    try {

        const oldLesson = await Lesson.findById(lessonID) ;

        if(!oldLesson) {
            res.status(401).send({message: "Lesson not found"}) ;
            return ;
        }

        if(oldLesson.teacherID != userID){
            res.status(403).send({message: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Lesson.findByIdAndUpdate(lessonID , {title , description , category , videoID , pdfID , level}) ;

        res.status(201).send({message: "The Lesson has been edit successfully"}) ;

    } catch (error) {
        console.error('edit Lesson error:' , error) ;
        res.status(500).send({
            message: "edit Lesson process failed" ,
            error: error
        });
    }

} ;

const deleteLesson =  async (req : Request , res: Response) : Promise<void> => {

    const { lessonID } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const oldLesson = await Lesson.findById(lessonID) ;

        if(!oldLesson) {
            res.status(401).send({message: "Lesson not found"}) ;
            return ;
        }

        if(oldLesson.teacherID != userID){
            res.status(403).send({message: "You do not have permission to perform this action"}) ;
            return ;
        }
            
        await Lesson.findByIdAndDelete(lessonID) ;

        res.status(201).send({message: "The Lesson has been delete successfully"}) ;

    } catch (error) {
        console.error('delete Lesson error:' , error) ;
        res.status(500).send({
            message: "delete Lesson process failed" ,
            error: error
        });
    }

} ; 


const getLessons =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.query ;
    const { userID } = req.payload ;

    try {

        if (typeof page !== 'string' || typeof limit !== 'string') {
            res.status(400).send({ error: "Page and limit must be strings" });
            return ;
        }
        
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            res.status(400).send({ error: "Invalid pagination parameters" }) ;
            return ;
        }

        const skip = (pageNumber - 1) * limitNumber ;

        let lessons = await Lesson.find().sort({createdAt: -1}).skip(skip).limit(limitNumber) ;
        let resLessons = lessons.map(Lesson => Object.assign({} , Lesson.toObject() , {isInLibrary: false})) ;

        for(let i = 0 ; i < lessons.length ; i ++){
            
            let inLibrary = await Library.findOne({userID: userID , lessonID: lessons[i]._id}) ;
            
            if(inLibrary)resLessons[i].isInLibrary = true ;

        }
        
        res.status(201).send({lessons: resLessons}) ;

    } catch (error) {
        console.error('get lessons error:' , error) ;
        res.status(500).send({
            message: "get lessons process failed" ,
            error: error
        });
    }

} ; 



const getLesson =  async (req : Request , res: Response) : Promise<void> => {
    
    const { userID } = req.payload ;
    const { lessonID } = req.query ;

    try {
        
        let oldLesson = await Lesson.findById(lessonID) ;

        if(!oldLesson){
            res.status(401).send({message: "Lesson not found"}) ;
            return ;
        }

        let LessonRes = Object.assign({} , oldLesson.toObject() , {isInLibrary: false}) ;

        let inLibrary = await Library.findOne({userID: userID , lessonID: lessonID}) ;

        if(inLibrary)LessonRes.isInLibrary = true ;

        res.status(201).send({Lesson: LessonRes}) ;

    } catch (error) {
        console.error('get Lesson error:' , error) ;
        res.status(500).send({
            message: "get Lesson process failed" ,
            error: error
        });
    }

} ; 

const addLessonToLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { lessonID } = req.body ;

    
    try {

        let oldLesson = await Library.findOne({lessonID: lessonID , userID: userID}) ;

        if(oldLesson){
            res.status(409).send({message: "Lesson is already added"}) ;
            return ;
        }

        
        let newlirary = new Library({
            userID: userID ,
            lessonID: lessonID
        }) ;

        await newlirary.save() ;
        res.status(201).send({Message: "Lesson has been added to Library"}) ;

        
    } catch (error) {
        console.error('add Lesson to Library error:' , error) ;
        res.status(500).send({
            message: "add Lesson to Library process failed" ,
            error: error
        });
    }

} ; 

const deleteLessonFromLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { lessonID } = req.body ;

    try {

        let oldLesson = await Library.findOne({lessonID: lessonID , userID: userID}) ;

        if(!oldLesson){
            res.status(401).send({message: "Lesson is already deleted"}) ;
            return ;
        }
        
        await Library.findByIdAndDelete(oldLesson._id) ;
        res.status(201).send({Message: "Lesson has been deleted from Library"}) ;

        
    } catch (error) {
        console.error('delete Lesson from Library error:' , error) ;
        res.status(500).send({
            message: "delete Lesson from Library process failed" ,
            error: error
        });
    }

} ; 


const getLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.query ;
    const { userID  } = req.payload ; 

    try {

        if (typeof page !== 'string' || typeof limit !== 'string') {
            res.status(400).send({ error: "Page and limit must be strings" });
            return ;
        }
        
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            res.status(400).send({ error: "Invalid pagination parameters" }) ;
            return ;
        }

        const skip = (pageNumber - 1) * limitNumber ;

        let myLibrary = await Library.find({userID: userID}).sort({createdAt: -1}).skip(skip).limit(limitNumber) ; ;

        let lessonMyLibrary:ILesson[] = [] ;

        for(let i = 0 ; i < myLibrary.length ; i ++){

            let oldLesson = await Lesson.findById(myLibrary[i].lessonID) ;

            if(oldLesson)lessonMyLibrary.push(oldLesson) ;

        }
        res.status(201).send({lessonMyLibrary: lessonMyLibrary}) ;

    } catch (error) {
        console.error('get Library error:' , error) ;
        res.status(500).send({
            message: "get Library process failed" ,
            error: error
        });
    }

} ; 

const getNumberOfLessons = async (req : Request , res: Response) : Promise<void> => {

    try {

        let numberOfLessons = await Lesson.countDocuments() ;

        res.status(201).send({numberOfLessons: numberOfLessons}) ;

    } catch (error) {

        console.error('get number of lessons error:' , error) ;
        res.status(500).send({
            message: "get number of lessons process failed" ,
            error: error
        });

    }
    

} ; 


const getNumberOfLessonsAtLibrary = async (req : Request , res: Response) : Promise<void> => {
    
    let { userID } = req.payload ;

    try {

        let numberOfLessons = await Library.countDocuments({userID: userID}) ;

        res.status(201).send({numberOfLessons: numberOfLessons}) ;

    } catch (error) {

        console.error('get number of lessons at Library error:' , error) ;
        res.status(500).send({
            message: "get number of lessons at Library process failed" ,
            error: error
        });

    }
    

} ; 

const getNumberOfMyLessons = async (req : Request , res: Response) : Promise<void> => {

    let { userID } = req.payload ;

    try {

        let numberOfLessons = await Lesson.countDocuments({teacherID: userID}) ;

        res.status(201).send({numberOfLessons: numberOfLessons}) ;

    } catch (error) {

        console.error('get number of lessons at Library error:' , error) ;
        res.status(500).send({
            message: "get number of lessons at Library process failed" ,
            error: error
        });

    }

}


const getMyLessons = async (req : Request , res: Response) : Promise<void> => {


    const { page , limit } = req.query ;
    const { userID } = req.payload ;

    try {
        
        if (typeof page !== 'string' || typeof limit !== 'string') {
            res.status(400).send({ error: "Page and limit must be strings" });
            return ;
        }
        
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            res.status(400).send({ error: "Invalid pagination parameters" }) ;
            return ;
        }

        const skip = (pageNumber - 1) * limitNumber ;

        let lessons = await Lesson.find({teacherID: userID}).sort({createdAt: -1}).skip(skip).limit(limitNumber) ;
        let resLessons = lessons.map(Lesson => Object.assign({} , Lesson.toObject() , {isInLibrary: false})) ;

        for(let i = 0 ; i < lessons.length ; i ++){
            
            let inLibrary = await Library.findOne({userID: userID , lessonID: lessons[i]._id}) ;
            
            if(inLibrary)resLessons[i].isInLibrary = true ;

        }
        
        res.status(201).send({lessons: resLessons}) ;

    } catch (error) {
        console.error('get lessons error:' , error) ;
        res.status(500).send({
            message: "get lessons process failed" ,
            error: error
        });
    }

}

export default {

    addLesson ,
    editLesson ,
    deleteLesson ,
    getLessons ,
    getLesson ,
    addLessonToLibrary ,
    deleteLessonFromLibrary ,
    getLibrary , 
    getNumberOfLessons , 
    getNumberOfLessonsAtLibrary , 
    getNumberOfMyLessons , 
    getMyLessons

}