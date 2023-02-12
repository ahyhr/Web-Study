var fs = require("fs");

//流式文件读取

//创建一个可读流
var rs= fs.createReadStream("C:/Users/yhr/Desktop/web/animation 动画.png");
//创建一个可写流
var ws = fs.createWriteStream("C:/Users/yhr/Desktop/流式文件.png");

//pipe() 将可读流中的内容，输出到可写流
rs.pipe(ws);



rs.once("open",function(){
    console.log("文件打开了~~");
});
rs.once("close",function(){
    console.log("文件关闭了~~");
});
ws.once("open",function(){
    console.log("文件写入~~");
});
ws.once("close",function(){
    console.log("写入完成~~");
});
