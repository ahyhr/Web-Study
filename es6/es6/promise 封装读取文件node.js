//使用nodejs
const fs = require('fs');
/*
fs.readFile('./es6/文档.txt',function(err,date){
    if (!err) {
        console.log(date.toString());
    }else{
        console.log('读取错误'+err);
    }
});
*/

//使用promise
const p = new Promise(function(resolve,reject){
    fs.readFile('./es6/文档.txt',function(err,date){
        if (err) {
            reject(err);
        }
        resolve(date);
    });
});

const result = p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log('读取失败'+reason);
});
