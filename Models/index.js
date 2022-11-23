const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/internship", {useNewUrlParser: true},(error)=>{
    if(!error){
        console.log("Success");
    }else{
        console.log("error!");
        console.log(error);
    }
});

const Course = require("./courses");