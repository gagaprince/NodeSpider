"use strict";
var http = require('http');
var URL = require('url');
var iconv = require('iconv-lite');
var _ = require('underscore');

var httpClient = {
    load:function(url,opt,callback){
        console.log(url);
        var urlObj = URL.parse(url);
        var options = {
            host:urlObj.host,
            port:urlObj.port,
            path:url
        };
        _.extend(options,opt);
        this.get(options,function(html){
            if(callback){
                callback(html);
            }
        });
    },
    get:function(opt,callback){
        http.get(opt, function (res) {
            var chunks = [];
            res.on('data',
                function (data) {
                    chunks.push(data);
                });

            res.on('end',function () {
                var html = iconv.decode(Buffer.concat(chunks), opt.charset||'utf-8');
                if(callback){
                    callback(html);
                }
            });
        }).on('error', function () {
            console.log('获取数据出错');
        });
    }
};
module.exports = httpClient;