require('./backend/connection.js');
var mongoose=require('mongoose');
const Schema = require('mongoose').Schema;
var bodyParser=require('body-parser');
var crypto = require('crypto');
const cors = require('cors');
var jwt = require('jsonwebtoken');
var { getToken} =  require ('./backend/Auth/utils');

//const { kill } = require('process');

var express = require('express'),
    employees = require('./backend/routes/employees'),
    user = require('./backend/routes/user'),
    app = express();

app.use(cors());
app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//const userInfo = Cookie.getJSON('userInfo') || null;
//    const logout = () => (dispatch) => {
 //      Cookie.remove("userInfo");
  //     dispatch({ type: USER_LOGOUT })
  //  }
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//------------------------------Pics routes---------------------------------------//

app.get('/pics/:name', function (req, res) {  
    res.sendFile(req.params.name,{root:'./backend/pics'} ); 
 })

//--------------------------- Routes to validate authentication --------------------//
app.post('/auth',function(req,res){
    const token = req.body.headers.Authorization;
    const onlyToken = token.slice(7, token.length);
    jwt.verify(token, 'JWT_SECRET', (err, decode) => {
      if (err) {
        res.json({ msg: 'Invalid Token' });
      }
      else{
      res.json({msg : 'Valid'});  
      }
    });               
});
//-----------------------------Routes for register & login------------------------//
app.post('/register',function(req,res){
    var query = user.find({'email':req.body.email});
    query.select('firstName');
    query.exec(function(err,data){
        if(data.length > 0){
            console.log("already Exist");
            res.json({msg : 'already Exist'});
        }
        else{ 
            SaveUserData(req);
            res.json({msg : 'Successful'});  
        }       
    });
});

function SaveUserData(req){
    var pwd=req.body.password;
    var hashed_pass = crypto.createHash('sha512').update(pwd).digest("hex");
    var user1 = new user({
        user_id:1,
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email,
        password:hashed_pass
    });
    user1.save(function(error){
    if(error){
        console.error(error);
  }
});
}
//----------------------------------- SignIN & SignUp -------------------------------------------
app.post('/login',function(req,res){
//    res.redirect('http://localhost/3000/');
    
    var password=req.body.pswd;
    var hashed_pass = crypto.createHash('sha512').update(password).digest("hex");
    const query =  user.findOne({
        'email': req.body.email,
        'password': hashed_pass,
      });
     query.select('_id user_id firstName email');
     query.exec(function(err,data){
      if (data) {
        res.send({
          _id: data._id,
          user_id:data.user_id,
          name: data.firstName,
          email: data.email,
          token: getToken(data),
        });
      } else {
        res.status(401).send({ msg: 'Unsuccessful' });
      }
    });
    
    }); 
//------------------------------Add employee data --------------------------------//
app.get('/saveEmployee',function(req,res){
    console.log("i am in saving employee data");
    SaveEmployeeData(req);
    console.log("done");
    res.send("done");  
});

function SaveEmployeeData(req){
    var employee1 = new employees({
        employee_id:4,
        firstName:"Ray", //req.body.firstname,
        lastName:"Moores",//req.body.lastname,
        managerId:0,//req.body.managerid,
        managerName:"James King",//req.body.managername,
        reports:2,//req.body.reports,
        title:"VP of Sales",//req.body.title,
        department:"Sales",//req.body.department,
        mobilePhone:7070000789,//req.body.mobilePhone,
        officePhone:9810000280,//req.body.officePhone,
        email:"rmoore@fakemail.com",//req.body.email,
        city:"Boston, MA",//req.body.city,
        pic:"Ray_Moore.jpg",//req.body.pic,
        twitterId:"@fakermoore",//req.body.twitterId 
    });
    employee1.save(function(error){
    if(error){
        console.error(error);
  }
});
}


//-----------------------fatch employee data---------------------------------------//

app.post('/employees',function(req,res){
    const token = req.body.headers.Authorization;
if(token){
    const onlyToken = token.slice(8, token.length);
    jwt.verify(onlyToken, 'JWT_SECRET', (err, decode) => {
        if (err) {
          res.json({ msg: 'Invalid Token' });
        }
        else{
            var keyLength = req.body.searchKey.length;
            if(keyLength>0){
                var query = employees.find({firstName: {$regex: req.body.searchKey, $options:'i' } });
            }
            else{
                var query = employees.find({});
            }
            query.select('employee_id firstName lastName managerId managerName reports title department  mobilePhone officePhone email city pic twitterId');
            query.exec(function(err,data){
                if(data.length == 0){
                    res.json({msg : 'Unsuccessful'});
                }
                else{
                       res.json( data); 
                }       
            });   
        }
      });
}
 else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }

       
});
 
//------------------------Connection configuration---------------------------------//
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});