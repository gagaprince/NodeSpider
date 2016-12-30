"use strict";
var cheerio = require('cheerio');

var $ ;
var testFilter = {
    init:function(html){
        $ = cheerio.load(html,{decodeEntities: false});
    },
    filterTitle:function(){
//        var title = unescape($('title').html().replace(/&#x/g,'%u').replace(/;/g,''));
        var title = $('title').html();
        return title;
    },
    filterContent:function(){
        var articleClass = $('.article');
//        console.log(articleClass.length);
        var articleItem = articleClass.find('article');
//        console.log(articleItem.length);
        var articleP = articleItem.find('p');
//        console.log(articleP.length);
        var content = "";
        for(var i=0;i<articleP.length;i++){
            var articlePitem = $(articleP[i]);
            var articleSpan = articlePitem.find('span');
            var appendHtml = articleSpan.html();
            if(appendHtml!=null){
                content+=appendHtml+'\n';
            }
        }
        return content;
    }
};

 module.exports = testFilter;