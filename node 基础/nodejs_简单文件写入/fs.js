/*
    简单文件写入
    fs.writeFile(file,data[,options],callback)
    fs.writeFileSync(file,data[,options])
        -file 要操作的文件路径
        -data 要写入的数据
        -options 选项,可以对写入进行一些设置
        -callback 当写入完成以后执行的函数
        -flag
            r 只读
            w 只写
            a 追加
*/
//引入fs模块
var fs = require("fs");

//异步写入
fs.writeFile("nodejs_简单文件写入/hello.txt","我是通过wiriteFile写入的内容",{flag:"w"},function(err){
    if (!err) {
        console.log("写入成功");
    }
});

//同步写入
fs.writeFileSync("nodejs_简单文件写入/hello2.txt","我是通过wiriteFileSync---写入的内容",{flag:"w"});