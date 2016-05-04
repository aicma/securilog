var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongoData = 'mongodb://alex:securilog@s013340.mlab.com:13340/heroku_2zhtbsdn';

mongoose.connect(mongoData);

app.get('/', function(req, res){
    res.send('get request received');
});

app.post
