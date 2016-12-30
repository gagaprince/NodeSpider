"use strict";
var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');

var file = {
    save:function(filePath,content,charset){
        var buf = iconv.encode(content,charset||'utf-8');

        var dir = filePath.substring(0,filePath.lastIndexOf('/'));
        this.mkdirSync(dir);

        fs.appendFile(filePath, buf, function(err){
            if(err)
                console.log("fail " + err);
            else
                console.log("写入文件 "+filePath+" ok");
        });
    },
    mkdirSync:function(dirpath){
        if (!fs.existsSync(dirpath)) {
            var pathtmp;
            dirpath.split(path.sep).forEach(function(dirname) {
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true;
    }
}

module.exports = file;