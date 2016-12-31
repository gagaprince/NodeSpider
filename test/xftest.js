"use strict";
var httpClient = require('../server/httpClient');
var conf = require('../server/conf/conf');
var file = require('../server/file');
var indexFilter = require('../server/filters/xflsn7/indexFilter.js');
var detailFilter = require('../server/filters/xflsn7/detailFilter.js');

var basePath = "http://www.xflsn7.com";
var _ = require("underscore");

var spider = {
    init:function(){
        var _this = this;
        this.findIndex(function(indexList){
            _this.findDetails(indexList,function(indexList){
                console.log(indexList);
                var textPath = conf.basePath+'xflsn7.txt';
                file.save(textPath,JSON.stringify(indexList));
            });
        })
    },
    findIndex:function(callbake){
        httpClient.load(basePath+"/list/index7.html",{
            charset:"gb2312"
        },function(html){
            indexFilter.init(html);
            //var title = indexFilter.filterTitle();
            //console.log(title);
            var indexList = indexFilter.filterIndex();
            if(callbake){
                callbake(indexList);
            }
        });
    },
    findDetails:function(indexList,callback){
        var len = indexList.length;
        var loadLen = len;
        for(var i=0;i<len;i++){
            var indexItem = indexList[i];
            var link = indexItem.link;
            this._findDetail(link,i,function(detailObj,index){
                var indexItem = indexList[index];
                _.extend(indexItem,detailObj);
                loadLen--;
                if(loadLen==0){
                    if(callback){
                        callback(indexList);
                    }
                }
            });

        }
    },
    _findDetail:function(link,index,callback){
        httpClient.load(basePath+link,{
            charset:"gb2312"
        },function(html){
            detailFilter.init(html);
            var detailObj = detailFilter.filterContent();
            if(callback){
                callback(detailObj,index);
            }
        });
    }
};
spider.init();


