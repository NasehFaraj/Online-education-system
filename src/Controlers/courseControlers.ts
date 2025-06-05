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

    const { courseID , title , description } = req.body ;
    const { userID } = req.payload ;

    try {

        const oldCourse = await Course.findById(courseID) ;

        if(!oldCourse) {
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        if(oldCourse.teacherID != userID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
        
        await Course.findByIdAndUpdate(courseID , {title , description}) ;

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

    const { courseID } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const oldCourse = await Course.findById(courseID) ;

        if(!oldCourse) {
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        if(oldCourse.teacherID != userID){
            res.status(403).send({massage: "You do not have permission to perform this action"}) ;
            return ;
        }
            
        await Course.findByIdAndDelete(courseID) ;

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

        let courses = await Course.find().skip(skip).limit(limit) ;
        let resCourses = courses.map(Course => Object.assign({} , Course.toObject() , {isInLibrary: false})) ;

        for(let i = 0 ; i < courses.length ; i ++){
            
            let inLibrary = await Library.findOne({userID: userID , courseID: courses[i]._id}) ;
            
            if(inLibrary)resCourses[i].isInLibrary = true ;

        }
        
        res.status(201).send({courses: resCourses}) ;

    } catch (error) {
        console.error('get courses error:' , error) ;
        res.status(500).send({
            message: "get courses process failed" ,
            error: error
        });
    }

} ; 



const getCourse =  async (req : Request , res: Response) : Promise<void> => {
    
    const { userID } = req.payload ;
    const { courseID } = req.body ;

    try {
        
        let oldCourse = await Course.findById(courseID) ;

        if(!oldCourse){
            res.status(401).send({massage: "Course not found"}) ;
            return ;
        }

        let CourseRes = Object.assign({} , oldCourse.toObject() , {isInLibrary: false}) ;

        let inLibrary = await Library.findOne({userID: userID , courseID: courseID}) ;

        if(inLibrary)CourseRes.isInLibrary = true ;

        res.status(201).send({Course: CourseRes}) ;

    } catch (error) {
        console.error('get Course error:' , error) ;
        res.status(500).send({
            message: "get Course process failed" ,
            error: error
        });
    }

} ; 

const addCourseToLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { courseID } = req.body ;

    
    try {

        let oldCourse = await Library.findOne({courseID: courseID , userID: userID}) ;

        if(oldCourse){
            res.status(409).send({massage: "Course is already added"}) ;
            return ;
        }

        
        let newlirary = new Library({
            userID: userID ,
            courseID: courseID
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

const deleteCourseFromLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { userID } = req.payload ;
    const { courseID } = req.body ;

    try {

        let oldCourse = await Library.findOne({courseID: courseID , userID: userID}) ;

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


const getLibrary =  async (req : Request , res: Response) : Promise<void> => {

    const { page , limit } = req.body ;
    const { userID  } = req.payload ; 

    try {

        const skip = (page - 1) * limit ;

        let myLibrary = await Library.find({userID: userID}).skip(skip).limit(limit) ; ;

        let courseMyLibrary:ICourse[] = [] ;

        for(let i = 0 ; i < myLibrary.length ; i ++){

            let oldCourse = await Course.findById(myLibrary[i].courseID) ;

            if(oldCourse)courseMyLibrary.push(oldCourse) ;

        }
        res.status(201).send({courseMyLibrary: courseMyLibrary}) ;

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

        console.error('get number of courses error:' , error) ;
        res.status(500).send({
            message: "get number of courses process failed" ,
            error: error
        });

    }
    

} ; 


const getNumberOfCoursesAtLibrary = async (req : Request , res: Response) : Promise<void> => {
    
    let { userID } = req.payload ;

    try {

        let numberOfCourses = await Library.countDocuments({userID: userID}) ;

        res.status(201).send({numberOfCourses: numberOfCourses}) ;

    } catch (error) {

        console.error('get number of courses at Library error:' , error) ;
        res.status(500).send({
            message: "get number of courses at Library process failed" ,
            error: error
        });

    }
    

} ; 

const getNumberOfMyCourses = async (req : Request , res: Response) : Promise<void> => {

    let { userID } = req.payload ;

    try {

        let numberOfCourses = await Course.countDocuments({teacherID: userID}) ;

        res.status(201).send({numberOfCourses: numberOfCourses}) ;

    } catch (error) {

        console.error('get number of courses at Library error:' , error) ;
        res.status(500).send({
            message: "get number of courses at Library process failed" ,
            error: error
        });

    }

}


const getMyCourses = async (req : Request , res: Response) : Promise<void> => {


    const { page , limit } = req.body ;
    const { userID } = req.payload ;

    try {
        
        const skip = (page - 1) * limit ;

        let courses = await Course.find({teacherID: userID}).skip(skip).limit(limit) ;
        let resCourses = courses.map(Course => Object.assign({} , Course.toObject() , {isInLibrary: false})) ;

        for(let i = 0 ; i < courses.length ; i ++){
            
            let inLibrary = await Library.findOne({userID: userID , courseID: courses[i]._id}) ;
            
            if(inLibrary)resCourses[i].isInLibrary = true ;

        }
        
        res.status(201).send({courses: resCourses}) ;

    } catch (error) {
        console.error('get courses error:' , error) ;
        res.status(500).send({
            message: "get courses process failed" ,
            error: error
        });
    }

}

export default {

    addCourse ,
    editCourse ,
    deleteCourse ,
    getCourses ,
    getCourse ,
    addCourseToLibrary ,
    deleteCourseFromLibrary ,
    getLibrary , 
    getNumberOfCourses , 
    getNumberOfCoursesAtLibrary , 
    getNumberOfMyCourses , 
    getMyCourses

}