"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/../client/'));
router(app);



var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("开启服务器：http://%s:%s",host,port);
});