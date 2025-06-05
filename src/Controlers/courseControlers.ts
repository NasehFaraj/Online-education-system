import { Request , Response } from "express";

import { Course } from "../Models/Course";
import { Library } from "../Models/Library" ;
import { ICourse } from "../Models/Course" ;

const addCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { title , description , category , videoPath , pdfPath } = req.body ;
    const { userID } = req.payload ;

    try {

        let newCourse = new Course ({
            title: title ,
            teacherID: userID ,
            category: category ,
            description: description ,
            videoPath: videoPath ,
            pdfPath: pdfPath ,
        }) ;

        newCourse.save() ;
        
        res.status(201).send({massage: "The Course has been added successfully"}) ;

    } catch (error) {
        console.error('add Course error:' , error) ;
        res.status(500).send({
            message: "add Course process failed" ,
            error: error
        });
    }


} ;

const editCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { CourseID , title , description } = req.body ;
    const { userID } = req.payload ;

    try {

        const oldCourse = await Course.findById(CourseID) ;

        if(!oldCourse) {
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        if(oldCourse.teacherID != userID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Course.findByIdAndUpdate(CourseID , {title , description}) ;

        res.status(201).send({massage: "The Course has been edit successfully"}) ;

    } catch (error) {
        console.error('edit Course error:' , error) ;
        res.status(500).send({
            message: "edit Course process failed" ,
            error: error
        });
    }

} ;

const deleteCourse =  async (req : Request , res: Response) : Promise<void> => {

    const { CourseID } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const oldCourse = await Course.findById(CourseID) ;

        if(!oldCourse) {
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        if(oldCourse.teacherID != userID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
            
        await Course.findByIdAndDelete(CourseID) ;

        res.status(201).send({massage: "The Course has been delete successfully"}) ;

    } catch (error) {
        console.error('delete Course error:' , error) ;
        res.status(500).send({
            message: "delete Course process failed" ,
            error: error
        });
    }

} ; 


const getCourses =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const skip = (page - 1) * limit ;

        let Courses = await Course.find().skip(skip).limit(limit) ;
        let resCourses = Courses.map(Course => Object.assign({} , Course.toObject() , {isInLibraryy: false})) ;

        for(let i = 0 ; i < Courses.length ; i ++){
            
            let inLibraryy = await Library.findOne({userID: userID , CourseID: Courses[i]._id}) ;
            
            if(inLibraryy)resCourses[i].isInLibraryy = true ;

        }
        
        res.status(201).send({Courses: resCourses}) ;

    } catch (error) {
        console.error('get Courses error:' , error) ;
        res.status(500).send({
            message: "get Courses process failed" ,
            error: error
        });
    }

} ; 



const getCourse =  async (req : Request , res: Response) : Promise<void> => {
    
    const { userID } = req.payload ;
    const { CourseID } = req.body ;

    try {
        
        let oldCourse = await Course.findById(CourseID) ;

        if(!oldCourse){
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        let CourseRes = Object.assign({} , oldCourse.toObject() , {isInLibraryy: false}) ;

        let inLibraryy = await Library.findOne({userID: userID , CourseID: CourseID}) ;

        if(inLibraryy)CourseRes.isInLibraryy = true ;

        res.status(201).send({Course: CourseRes}) ;

    } catch (error) {
        console.error('get Course error:' , error) ;
        res.status(500).send({
            message: "get Course process failed" ,
            error: error
        });
    }

} ; 

const addCourseToLibraryy =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { CourseID } = req.body ;

    
    try {

        let oldCourse = await Library.findOne({CourseID: CourseID , userID: userID}) ;

        if(oldCourse){
            res.status(409).send({massage: "Course is already added"}) ;
            return ;
        }

        
        let newlirary = new Library({
            userID: userID ,
            CourseID: CourseID
        }) ;

        await newlirary.save() ;
        res.status(201).send({Message: "Course has been added to Library"}) ;

        
    } catch (error) {
        console.error('add Course to Library error:' , error) ;
        res.status(500).send({
            message: "add Course to Library process failed" ,
            error: error
        });
    }

} ; 

const deleteCourseFromLibraryy =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { CourseID } = req.body ;

    try {

        let oldCourse = await Library.findOne({CourseID: CourseID , userID: userID}) ;

        if(!oldCourse){
            res.status(401).send({massage: "Course is already deleted"}) ;
            return ;
        }
        
        await Library.findByIdAndDelete(oldCourse._id) ;
        res.status(201).send({Message: "Course has been deleted from Library"}) ;

        
    } catch (error) {
        console.error('delete Course from Library error:' , error) ;
        res.status(500).send({
            message: "delete Course from Library process failed" ,
            error: error
        });
    }

} ; 


const getLibraryy =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.body ;
    const { userID  } = req.payload ; 

    try {

        const skip = (page - 1) * limit ;

        let myLibraryy = await Library.find({userID: userID}).skip(skip).limit(limit) ; ;

        let CourseMyLibraryy:ICourse[] = [] ;

        for(let i = 0 ; i < myLibraryy.length ; i ++){

            let oldCourse = await Course.findById(myLibraryy[i].courseID) ;

            if(oldCourse)CourseMyLibraryy.push(oldCourse) ;

        }
        res.status(201).send({CourseMyLibraryy: CourseMyLibraryy}) ;

    } catch (error) {
        console.error('get Library error:' , error) ;
        res.status(500).send({
            message: "get Library process failed" ,
            error: error
        });
    }

} ; 

const getNumberOfCourses = async (req : Request , res: Response) : Promise<void> => {

    try {

        let numberOfCourses = await Course.countDocuments() ;

        res.status(201).send({numberOfCourses: numberOfCourses}) ;

    } catch (error) {

        console.error('get number of Courses error:' , error) ;
        res.status(500).send({
            message: "get number of Courses process failed" ,
            error: error
        });

    }
    

} ; 


const getNumberOfCoursesAtLibraryy = async (req : Request , res: Response) : Promise<void> => {
    
    let { userID } = req.payload ;

    try {

        let numberOfCourses = await Library.countDocuments({userID: userID}) ;

        res.status(201).send({numberOfCourses: numberOfCourses}) ;

    } catch (error) {

        console.error('get number of Courses at Libraryy error:' , error) ;
        res.status(500).send({
            message: "get number of Courses at Libraryy process failed" ,
            error: error
        });

    }
    

} ; 


export default {

    addCourse ,
    editCourse ,
    deleteCourse ,
    getCourses ,
    getCourse ,
    addCourseToLibraryy ,
    deleteCourseFromLibraryy ,
    getLibraryy , 
    getNumberOfCourses , 
    getNumberOfCoursesAtLibraryy 

}