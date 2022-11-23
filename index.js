require('dotenv').config();
const express = require('express');
const application = express(); // initialize our express app
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const bodyParser = require('body-parser');
const courseController = require("./Controllers/Courses");
application.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
application.use(bodyParser.json()); // parse requests of content-type - application/json

 
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));

application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3000;

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
const URI = "mongodb://127.0.0.1:27017/internship";
    mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
});

//Load all your models
var User = require('./Models/users');
var Course = require('./Models/courses');
//Now, this call won't fail because User has been added as a schema.
mongoose.model('User');
mongoose.model('Course');

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
application.use(passport.initialize());
require("./Middlewares/jwt")(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./Routes/index')(application);

//=== 5 - START SERVER
application.listen(PORT, () => console.log('hello Yougalli :'+PORT+'/'));
application.get('/', function(req, res) {
    console.log("on route /");
})

application.use("/Course", courseController);

application.post('/q', function(req, res) {
    console.log("hey ", req.body.name);
    res.send(req.body.name)
})