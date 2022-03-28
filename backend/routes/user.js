var mongoose = require("mongoose");
require('../connection.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        user_id:String,
        firstName:String,
        lastName:String,
        email:String,
        password:String 
});

const user = mongoose.model("user", userSchema);
module.exports=user;