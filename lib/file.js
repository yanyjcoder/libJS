var readLine = require('readline');
var fs = require('fs');
var os = require('os');
var path = require("path");

var deleteFolderRecursive = function(url) {
    var files = [];
    //判断给定的路径是否存在
    if( fs.existsSync(url) ) {
        //返回文件和子目录的数组
        files = fs.readdirSync(url);
        files.forEach(function(file,index){
            // var curPath = url + "/" + file;
            var curPath = path.join(url,file);
            //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
                // 是文件delete file
            } else {
                fs.unlinkSync(curPath);
                console.log('已删除文件:[' + curPath + ']');
            }
        });
        //清除文件夹
        // fs.rmdirSync(url);
    }else{
        console.log("给定的路径不存在，请给出正确的路径");
    }
};

/**
 *
 * @param {string} sourceFile
 * @param {string} splitTarget
 * @param {string} splitCatalogue
 * @param {[]} splitFilesNameArray
 */
module.exports = function (sourceFile, splitTarget, splitCatalogue ,splitFilesNameArray) {
    deleteFolderRecursive("./src/libJS");
    var fileNameIndex = 0;

    var fRead = fs.createReadStream(sourceFile);
    var fWrite = fs.createWriteStream(splitFilesNameArray[fileNameIndex]);

    var objReadline = readLine.createInterface({
        input: fRead,
    // 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
    // 但文件末尾会多算一次index计数   sodino.com
    //  output: fWrite,
    //  terminal: true
    });

    objReadline.on('line', (line)=>{
        // var tmp = 'line' + index.toString() + ':' + line;

        if(line !== splitTarget) {
            fWrite.write(line + os.EOL); // 下一行
        } else {


            if(fileNameIndex < splitFilesNameArray.length) {
                console.log("已切换文件" + splitFilesNameArray[++fileNameIndex]);
                fWrite =  fs.createWriteStream(splitFilesNameArray[fileNameIndex]);
            }
        }
    });

    objReadline.on('close', ()=>{
        console.log('切割完毕');
    });


};

