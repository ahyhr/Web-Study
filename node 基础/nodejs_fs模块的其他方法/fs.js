var fs = require("fs");

//fs.stat() 获取文件的状态
fs.stat("nodejs_fs模块的其他方法/闭包.jpg",function(err,stat){
        /*
            -size 文件的大小
            -isFile() 是否是文件
            -isDirectory() 是否是文件夹
        */
        console.log(stat.size);
});

//fs.unlink(path,callback)   删除文件
//fs.unlinkSync(path)

// fs.unlinkSync("nodejs_fs模块的其他方法/闭包.jpg");

/*fs.readdir()
    -读取一个目录的结构
        files是一个字符串数组，每个元素就是一个文件夹或文件的名字
*/
fs.readdir("nodejs_fs模块的其他方法",function(err,files){
    console.log(files);
});

/*
fs.truncate()
    -截断文件，将文件修改为指定大小
*/
fs.truncateSync("nodejs_fs模块的其他方法/txxt.txt",5);//一个中文为3字节


/*
fs.mkdir(path[,mode],callback)
    -创建一个目录文件夹
*/
fs.mkdirSync("nodejs_fs模块的其他方法/t");

//删除一个文件夹
fs.rmdirSync("nodejs_fs模块的其他方法/t");

/*
fs.rename(oldPath,newPath,callback)
    -修改名字
    -可以用来实现剪切功能
*/
//fs.renameSync("nodejs_fs模块的其他方法/txxt.txt","nodejs_fs模块的其他方法/xxx.txt");


/*
    fs.watchFile(path,[options],callback)
            interval 监听的时间间隔
        -监听文件的修改
            -curr 当前文件状态(更改后)
            -prev 修改前文件状态
                -都是stats对象
*/
fs.watchFile("nodejs_fs模块的其他方法/txxt.txt",{interval:1000},function(curr,prev){
    console.log("修改前"+prev.size);
    console.log("修改后"+curr.size);
});