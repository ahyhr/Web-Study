//引入fs文件系统
var fs = require("fs");

//打开文件      fs.openSync()
var fd = fs.openSync("nodejs_同步文件写入/hello.txt","w"); //"w"可写  "r"只读
//写入文件      fs.writeSync()
fs.writeSync(fd,"今天天气针不戳-_-");
//关闭文件      fs.closeSync()
fs.closeSync(fd);

console.log(fd);