import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  //axios 拦截器

  //请求拦截器
  instance.interceptors.request.use(config => {   
    console.log(config);
    //1.比如config中的一些信息不符合服务器要求

    //2.比如每次发送网络请求时,希望现实请求图标(加载图标)

    //3.某些网络请求(比如登录token),必须携带一些特殊的信息

    //在处理完成之后要返回(放行)
    return config;  
  },err => {    
    //没有发送出去请求
    console.log(err);
  });

  //响应拦截器
  instance.interceptors.response.use(res => {
    console.log(res);
    return res.data;
  },err => {
    console.log(err);
  });



  return instance(config);
}


