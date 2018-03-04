var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
// var Admin = require('./Models/Admin');
var Badge = require('./Models/Badge');
var ChangeReq = require('./Models/ChangeReq');
var Link = require('./Models/Link');
var Score = require('./Models/Score');
var Student = require('./Models/Student');
var { check, validationResult } = require('express-validator/check');
var session    = require('express-session');
var Admin = mongoose.model('Admin');


//mongoose.connect('mongodb://localhost:27017/facebook');
mongoose.connect('mongodb://test:test@ds141068.mlab.com:41068/one-mirror');

//app.use(cors());
app.use(bodyParser.json());


// Cross-origin resource sharing - Middelware
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST', 'DELETE', 'PUT'],
    credentials: true // enablae set cookie
}));

// Session - Middelware
app.use(session({
  resave: true,
  secret: 'Vt9PxTrm~E{4`9]T',
  saveUninitialized:true,
   cookie:{maxAge:16000}
 }));


app.get('/test',function(req,res){
  res.send('Hello Server');
})


//Input validation///////////////////////////////////////////////////////

validateStudentId= [
  check('studId','Please enter a student ID ').not().isEmpty(),

]

app.post('student/search',validateStudentId,function(req,res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(422).json({errors: errors.mapped()});
  }

  Student.findOne(req.body)
  .then(function(user){
    if(!user){
      return res.send({status: 'error', message: 'Student not found'});
    }
    console.log(user);
    res.send(user);
  })
  .catch(function(error){
    res.send({error: 'error', message: 'Something went wrong'});
  })
})

// student Login

const studentLoginValidation = [
  check('studentid', 'Please enter a StudentID').not().isEmpty(),
  check('password', 'Please enter your password').not().isEmpty(),
  check('studentid', 'Please enter a valid StudentID').custom(value=> {
    return Student.find({'studentid': value})
      .then(user => {
        if(user.length)
          return false;
          else
            return true;
      })
  })
];

app.get('/studentlogin',studentLoginValidation ,function(req, res){
  const errors = validationResult(req);
  if(!erros.isEmpty()) {
    console.log(errors);
    console.log(errors.mapped());
    return res.status(422).json({errors: errors.mapped()});
  }
  Student.findOne(req.body)
    .then(function (user) {
      if(!user) {
        return res.send({status: 'error', message: 'no student found'})
      }
      req.session.userIsLoggedin = user;
      res.send(user);
    }).catch(function (error) {
      res.send({error: 'error', message: 'Something went wrong'})
    });
});


app.listen(8080,function(){
  console.log('listening on port 8080');
})
