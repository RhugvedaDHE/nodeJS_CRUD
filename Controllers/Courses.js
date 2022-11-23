const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
var Course = require('../Models/courses.js');
const CourseModel = mongoose.model("Course");


//Get all courses
router.get("/list", function(req, res) {
    CourseModel.find((error, docs)=>{
        if(!error){
            res.json({ 
                status: 200,
                data: docs,
                message: "Courses fetched Successfully!" 
            });
        }
        else{
            res.json({ 
                status: 400,
                data: "" ,
                message: error
            });
        }
    })
})

//Get a course by ID
router.get("/get/:id", function(req, res) {   
    CourseModel.findOne({courseId: req.params.id},(error, docs)=>{
        if(!error){
            res.json({ 
                status: 200,
                data: docs,
                message: "Course fetched Successfully!" 
            });
        }
        else{
            res.json({ 
                status: 400,
                data: "" ,
                message: error
            });
        }
    })
})

//create a new Course
router.post("/create", function(req, res) {
    var course = new CourseModel();
    course.coursename = req.body.coursename;
    course.courseId = req.body.courseId;
    course.courseFee = req.body.courseFee;
    course.courseDuration = req.body.courseDuration;
    course.save((error) => {
        if(!error){
            res.json({ 
                status: 200,
                data: "",
                message: "Course details Saved Successfully!" 
            });
        }
        else{
            res.json({ 
                status: 400,
                data: "" ,
                message: error
            });
        }
    });    
})

//update a particular Course
router.post("/update", async function(req, res) {
    console.log(req.body);
    try{
        await CourseModel.updateOne({courseId: req.body.courseId}, {
            coursename: req.body.coursename,
            courseFee: req.body.courseFee,
            courseDuration: req.body.courseDuration
        })
        res.json({ 
            status: 200,
            data: "",
            message: "Course details Updated Successfully!" 
        });
    }catch(error){
        res.json({ 
            status: 400,
            data: "" ,
            message: error
        });
    } 
})

//delete a particular course
router.get("/delete/:id", function(req, res) {   
    CourseModel.deleteOne({courseId: req.params.id},(error, docs)=>{
        if(!error){
            res.json({ 
                status: 200,
                data: docs,
                message: "Course deleted Successfully!" 
            });
        }
        else{
            res.json({ 
                status: 400,
                data: "" ,
                message: error
            });
        }
    })
})
module.exports = router;