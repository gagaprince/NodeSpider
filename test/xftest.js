var conf = require('../server/conf/conf.js');
var file = require('../server/file.js');
var spider = require('../server/xflsnSpider.js');

spider.spiderLink("/list/index7_2.html",function(indexList){
    console.log(indexList);
    var textPath = conf.basePath+'xflsn7.txt';
    file.save(textPath,JSON.stringify(indexList));
});