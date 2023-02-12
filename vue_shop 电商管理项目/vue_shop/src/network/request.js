import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '/api/private/v1/',
    timeout: 10000,
  });

  instance.interceptors.request.use(config => {
    // 为请求头对象, 添加 token 验证的 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
  }, error => {
    console.log('error');
  });

  return instance(config)
}


