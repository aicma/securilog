var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var mongoose = require('mongoose');
var mongoData = 'mongodb://alex:securilog@s013340.mlab.com:13340/heroku_2zhtbsdn';

mongoose.connect(mongoData);

app.get('/', function(req, res){
    res.send('get request received');
});

app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
