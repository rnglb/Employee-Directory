var mongoose = require("mongoose");
require('../connection.js');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
        employee_id:String,
        firstName:String,
        lastName:String,
        managerId:Number,
        managerName:String,
        reports:Number,
        title:String,
        department:String,
        mobilePhone:Number,
        officePhone:Number,
        email:String,
        city:String,
        pic:String,
        twitterId:String 
});

const employees = mongoose.model("employee", employeeSchema);
module.exports=employees;