"use strict";
var cheerio = require('cheerio');

var $ ;
var testFilter = {
    init:function(html){
        $ = cheerio.load(html,{decodeEntities: false});
    },
    filterTitle:function(){
        return $("title").html();
    },
    filterIndex:function(){
        var atags = $("a");
        console.log(atags.length);
        var indexTags = [];
        for(var i=0;i<atags.length;i++){
            var href = $(atags[i]).attr("href");
            var innerhtml = $(atags[i]).html();
            if(href&&href.indexOf("/view/")!=-1&&innerhtml.indexOf("点击")==-1){
                var teps = innerhtml.split(">");
                var title = teps.length>1?teps[1]:innerhtml;
                var obj = {
                    link:href,
                    title:title
                };
                indexTags.push(obj);
            }
        }
        return indexTags;
    }
};

module.exports = testFilter;