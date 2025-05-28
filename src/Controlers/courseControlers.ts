import { Request , Response } from "express";
import { course } from "../Models/course";
import { ICourseResponse } from "../Interfaces/ICourseResponse";
import { library } from "../Models/Library";
import fs from "fs" ;

const addCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { title , description , category , videoPath , pdfPath } = req.body ;
    const { userID } = req.payload ;

    try {

        let newCourse = new course ({
            title: title ,
            teacherID: userID ,
            category: category ,
            description: description ,
            videoPath: videoPath ,
            pdfPath: pdfPath ,
        }) ;

        newCourse.save() ;
        
        res.status(201).send({massage: "The course has been added successfully"}) ;

    } catch (error) {
        console.error('add course error:' , error) ;
        res.status(500).send({
            message: "add course process failed" ,
            error: error
        });
    }


} ;

const editCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { courseID , title , description } = req.body ;
    const { userID } = req.payload ;

    const oldCourse = await course.findById(courseID) ;

    if(!oldCourse) {
        res.status(401).send({massage: "course not found"}) ;
        return ;
    }

    if(oldCourse.teacherID != userID){
        res.status(403).send({massage: "You do not have permission to perform this action"}) ;
        return ;
    }

    oldCourse.title = title ;
    oldCourse.description = description ;

    try {
        
        await oldCourse.save() ;

        res.status(201).send({massage: "The course has been edit successfully"}) ;

    } catch (error) {
        console.error('edit course error:' , error) ;
        res.status(500).send({
            message: "edit course process failed" ,
            error: error
        });
    }

} ;

const deleteCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { courseID } = req.body ;
    const { userID } = req.payload ;

    const oldCourse = await course.findById(courseID) ;

    if(!oldCourse) {
        res.status(401).send({massage: "course not found"}) ;
        return ;
    }

    if(oldCourse.teacherID != userID){
        res.status(403).send({massage: "You do not have permission to perform this action"}) ;
        return ;
    }

    try {
        
        if(oldCourse.pdfPath)fs.unlinkSync(oldCourse.pdfPath) ;
        if(oldCourse.videoPath)fs.unlinkSync(oldCourse.videoPath) ;

        await course.findByIdAndDelete(courseID) ;

        res.status(201).send({massage: "The course has been delete successfully"}) ;

    } catch (error) {
        console.error('delete course error:' , error) ;
        res.status(500).send({
            message: "delete course process failed" ,
            error: error
        });
    }

} ; 


const getCourses =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.body ;

    const skip = (page - 1) * limit ;

    const courses = await course.find().skip(skip).limit(limit) ;

    res.status(201).send({courses: courses}) ;

} ; 



const getCourse =  async (req : Request , res: Response) : Promise<void> => {
    
    const { userID } = req.payload ;
    const { courseID } = req.body ;

    let oldCourse = await course.findById(courseID) ;

    if(!oldCourse){
        res.status(401).send({massage: "course not found"}) ;
        return ;
    }

    let courseRes:ICourseResponse = oldCourse ;

    let inLibrary = await library.findOne({userID: userID , courseID: courseID}) ;

    if(inLibrary)courseRes.isInLibrary = true ;
    else courseRes.isInLibrary = false ;

    res.status(201).send({course: courseRes}) ;

} ; 

const addCourseToLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { courseID } = req.body ;

    let oldCourse = await library.findOne({courseID: courseID , userID: userID}) ;

    if(oldCourse){
        res.status(401).send({massage: "course is already added"}) ;
        return ;
    }

    try {
        
        let newlirary = new library({
            userID: userID ,
            courseID: courseID
        }) ;

        await newlirary.save() ;
        res.status(201).send({Message: "course has been added to library"}) ;

        
    } catch (error) {
        console.error('add course to library error:' , error) ;
        res.status(500).send({
            message: "add course to library process failed" ,
            error: error
        });
    }

} ; 

const deleteCourseFromLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { courseID } = req.body ;

    let oldCourse = await library.findOne({courseID: courseID , userID: userID}) ;

    if(!oldCourse){
        res.status(401).send({massage: "course is already deleted"}) ;
        return ;
    }

    try {
        
        await library.findByIdAndDelete(oldCourse._id) ;
        res.status(201).send({Message: "course has been deleted from library"}) ;

        
    } catch (error) {
        console.error('delete course from library error:' , error) ;
        res.status(500).send({
            message: "delete course from library process failed" ,
            error: error
        });
    }

} ; 


const getLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;

    let myLibrary = await library.find({userID: userID}) ;

    res.status(201).send({myLibrary: myLibrary}) ;

} ; 



export default {

    addCourse ,
    editCourse ,
    deleteCourse ,
    getCourses ,
    getCourse ,
    addCourseToLibrary ,
    deleteCourseFromLibrary ,
    getLibrary

}