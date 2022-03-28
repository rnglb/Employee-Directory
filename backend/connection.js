const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employeeDirectory',{useNewUrlParser: true});

mongoose.connection.once('open',function(){
      console.log('connection has made');
});