//引入模块
var fs = require("fs");

//打开文件  fs.open(地址,flags,回调函数)    结果通过回调函数返回
fs.open("nodejs_异步文件写入/hello2.txt","w",function(err,fd){
    //如果没有出错
    if (!err) {
        //写入文件
        fs.write(fd,"我是异步写入的内容~~",function(err){
           if (!err) {
               console.log("写入成功");
           }
           //关闭文件
           fs.close(fd,function(err){
            if (!err) {
                console.log("文件已关闭");
            }
       });
        });
    } else {
        console.log(err);
    }
});