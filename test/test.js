"use strict";
var httpClient = require('../server/httpClient');
var conf = require('../server/conf/conf');
var file = require('../server/file');
var testFilter = require('../server/filters/testFilter/testFilter');
httpClient.load("http://www.lookmw.cn/lizhi/114600.html",{
    charset:"gb2312"
},function(html){
    var path = conf.basePath+'114600.html';
//    file.save(path,html);
    testFilter.init(html);
    var title = testFilter.filterTitle();
    console.log("文档title:");
    console.log(title);
    var content = testFilter.filterContent();
    console.log("文档正文：");
    console.log(content);
    var textPath = conf.basePath+title+'.txt';
    file.save(textPath,content);
});