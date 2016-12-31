"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var conf = require('./conf/conf.js');
var xfSpider = require('./xflsnSpider.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(conf.rootPath));

app.post('/xflsn',function(req,res){
    var pageObj = req.body;
    var pageNum = pageObj.pageNum;
    if(pageNum==1){
        var link = '/list/index7.html';
    }else{
        var link = '/list/index7_'+pageNum+'.html';
    }
    xfSpider.spiderLink(link,function(list){
        res.send(list);
    });
});



var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("开启服务器：http://%s:%s",host,port);
});