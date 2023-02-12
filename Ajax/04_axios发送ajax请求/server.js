// 1.引入express
const express = require('express')

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request 是对请求报文的封装
// response 是对相应报文的封装
app.get('/axios', (request,response) =>{
  // 设置响应头  设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体
  const obj = {
    name: 'yhr',
    age: 21
  }
  let str = JSON.stringify(obj);
  response.send(str);
})

app.post('/axios',(request,response) =>{
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send('post数据');
})

app.listen(8000, ()=>{
  console.log('服务器已经启动');
})
//nodemon 插件执行自动更新