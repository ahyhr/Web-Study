/*
    1.同步文件读取
    2.异步文件读取
    3.简单文件读取
        fs.readFile(path[,options],callback)
        fs.readFileSync(path[,options])
            -path 要读取的选项
            -options 读取的选项
            -callback 回调函数，将读取到的内容返回(err,data)
    4.流式文件读取
*/

var fs = require("fs");

//简单文件读取  (buffer)
fs.readFile("C:/Users/yhr/Desktop/web/animation 动画.png",function(err,data){
    if (!err) {
       console.log(data);
       fs.writeFile("C:/Users/yhr/Desktop/简单文件读取.png",data,function(){
            console.log("写入成功~~");
       });
    }
});

