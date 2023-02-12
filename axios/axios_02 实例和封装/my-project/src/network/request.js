import axios from 'axios'

//封装axios 进行统一管理

export function request(config){
  //1.创建axios实例     
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  //2.发送真正的网络请求        返回为promise
  return instance(config);
}
