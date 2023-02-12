const fs = require("fs");

//node调用 需要一直回调
/*
fs.readFile('./es6/文档.txt',function(err,data1){
    fs.readFile('./es6/文档2.txt',function(err,data2){
        fs.readFile('./es6/文档3.txt',function(err,data3){
            console.log(data1+'\r\n'+data2+'\r\n'+data3);
        });
    });
});
*/

//Promise 读取 避免回调地狱
const p = new Promise((resolve,reject)=>{
    fs.readFile('./es6/文档.txt',(err,data)=>{
        if (err) reject(err);
        resolve(data);
    })
});

//将多个异步任务串联
//这里value为文档1
p.then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./es6/文档2.txt',(err,data)=>{
            //此时p.then方法返回成功值为 [文档1+文档2]
            resolve ([value,data]);
        });
    })
}).then(value=>{//value为[文档1+文档2+文档3]
    return new Promise((resolve,reject)=>{
        fs.readFile('./es6/文档3.txt',(err,data)=>{
            //加入文档3
            value.push(data);
            resolve(value);
        });
    })
}).then(value=>{//输出
    console.log(value.join('\r\n'));
});