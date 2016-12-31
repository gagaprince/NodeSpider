"use strict";

var page = {
    currentPage:1,
    base:"http://www.xflsn7.com",
    init:function(){
        this.initPage();
        this.initListener();
    },
    initPage:function(){
        var _this = this;
        this.getDataByPage(this.currentPage,function(res){
            _this.render(res);
        });

    },
    getDataByPage:function(pageNum,callback){
        this._api("xflsn",{
            pageNum:pageNum
        },function(res){
            if(callback){
                callback(res);
            }
        });
    },
    _api:function(url,data,callback){
        $.ajax({
            url:url,
            data:JSON.stringify(data),
            contentType:"application/json;charset=UTF-8",
            type : 'POST',
            dataType : 'json',
            timeout : 3e5,
            success:function(res){
                if(typeof res == "string"){
                    res = JSON.parse(res);
                }
                if(callback){
                    callback(res);
                }
            }
        });
    },
    initListener:function(){
        var _this = this;
        $("body").on("click",".pre",function(){
            _this.goPre();
        });
        $("body").on("click",".next",function(){
            _this.goNext();
        });
        $("body").on("click",".go",function(){
            var pageNum = $("#pageNum").val();
            pageNum = parseInt(pageNum);
            _this.currentPage = pageNum;
            _this.initPage();
        });
        /*$("body").on("click",".item",function(){
            var link = $(this).attr("link");

        })*/
    },
    goPre:function(){
        if(this.currentPage>0){
            this.currentPage--;
            this.initPage();
        }
    },
    goNext:function(){
        this.currentPage++;
        this.initPage();
    },
    render:function(list){
        var len = list.length;
        var html = '';
        for(var i=0;i<len;i++){
            var item = list[i];
            var title = item["title"];
            var desc = item["desc"];
            var link = this.base+item["link"];
            var img = item["imgsrc"];

            var tpl = ['<a class="item" href="'+link+'" target="_blank">',
                '                <div class="title">'+title+'</div>',
                '                <div class="photo">',
                '                    <img src="'+img+'" alt=""/>',
                '                </div>',
                '                <div class="desc">',
                desc,
                '                </div>',
                '            </a>'].join("");
            html+=tpl;
        }
        $("#list").html(html);
        $("#pageTitle").html("第"+this.currentPage+"页");
    }
}


$(document).ready(function(){
    page.init();
});