/*
 * @Descripttion: axios 封装
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 14:39:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-23 17:00:57
 */
import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做什么
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  function (config) {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应做什么
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
