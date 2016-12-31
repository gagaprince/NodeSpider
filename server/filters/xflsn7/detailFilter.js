"use strict";
var cheerio = require('cheerio');

var $ ;
var detailFilter = {
    init:function(html){
        $ = cheerio.load(html,{decodeEntities: false});
    },
    filterTitle:function(){
        return $("title").html();
    },
    filterContent:function(){
        var obj;
        var table = $("table table");
        var tds = table.find("td");
        for(var i=0;i<tds.length;i++){
            var td = $(tds[i]);
            if(td.attr("valign")=="bottom"){
                var desc = td.find("p").html();
                var imgsrc = td.find("img").attr("src");
                obj = {
                    desc:desc,
                    imgsrc:imgsrc
                }
            }
        }
        return obj;
    }
};

module.exports = detailFilter;