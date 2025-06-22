import axios from 'axios';
import { config } from '../config/index';

console.log('config', config.apiBaseUrl);

// 创建 axios 实例
const service = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如：添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 800) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    let message = '';
    console.log('error---', error);
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = '未授权，请重新登录';
        // 可以在这里处理登出逻辑
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }
    return Promise.resolve(error.response.data);
  }
);

export default service;
