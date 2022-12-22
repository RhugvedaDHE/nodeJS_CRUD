require('dotenv').config();
const express = require('express');
const application = express(); // initialize our express app
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const bodyParser = require('body-parser');

var p = require('permission')
p.AUTHORIZED === 'authorized' // true
p.NOT_AUTHENTICATED === 'notAuthenticated' // true
p.NOT_AUTHORIZED === 'notAuthorized' // true

const courseController = require("./Controllers/Courses.controller");
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
let PORT = process.env.PORT || 3000;

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
const URI = process.env.MONGO_LOCAL_CONN_URL;
    mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
});

//Load all your models
var User = require('./Models/users.model');
var Course = require('./Models/courses.model');
//Now, this call won't fail because User has been added as a schema.
mongoose.model('User');
mongoose.model('Course');

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
application.use(passport.initialize());
require("./Middlewares/jwt")(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./Routes/index.routes')(application);

//=== 5 - START SERVER
application.listen(PORT, () => console.log('hello:'+PORT+'/'));
application.get('/', function(req, res) {
    console.log("on route /");
    res.send("Hey welcome to my first NodeJS programme!")
})
application.get('/welcome', function(req, res){
    console.log("on route welcome");
    res.send("!!WELCOME!!")
})
application.use("/Course", courseController);

application.post('/q', function(req, res) {
    console.log("hey ", req.body.name);
    res.send(req.body.name)
})