/*
 * @Descripttion: axios 封装
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 14:39:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-21 16:35:13
 */
import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {},
});

// 请求拦截器
service.interceptors.request.use();

// 响应拦截器
service.interceptors.response.use();
export default service;
