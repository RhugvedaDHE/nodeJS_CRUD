const mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: "Course Name is required"
    },
    courseId: {
        type: String
    },
    courseDuration: {
        type: String,        
    },
    courseFee: {
        type: String
    }
})

mongoose.model("Course", CourseSchema);