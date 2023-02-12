//引入文件管理模块
const fs = require('fs');

//创建读取文件方法   返回 Rromise 对象
function readDoc1(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./es8/文档.txt',function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

function readDoc2(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./es8/文档2.txt',function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

function readDoc3(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./es8/文档3.txt',function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

//async函数中      await接收Promise返回值
async function main(){
    try {
        let doc1Res = await readDoc1();
        let doc2Res = await readDoc2();
        let doc3Res = await readDoc3();
        console.log((doc1Res+'\n'+doc2Res+'\n'+doc3Res));
    } catch (err) {
        console.log(err);
    }
}

main();
