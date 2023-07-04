/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 21:10:27
 */
import service from "./index";

export function login() {
  return service.get("/");
}

// 发送请求的两种写法

// 使用 async 可以捕获返回的值
// 没有使用 async 捕获不了返回的值

// 有---try---catch---会被捕获 error
export const fetchData = async (data) => {
  const res = await service.get("/");
  data.value = res.data;
};
// 有---try---catch---不会被捕获 error
export const getHome = (data) => {
  service.get("/").then((res) => {
    data.value = res.data;
  });
  // .catch((err) => {
  // console.log(err);
  // });
};

export const getRouter = (data) => {
  service.get("/router").then(function (res) {
    data.value = res.data;
    // console.log("getHome", res.data);
  });
  // .catch(function (err) {
  //   console.log(err);
  // });
};

/**
 * @description:登录
 * @param {*} data
 * @returns res
 */
export const postLogin = async (data) => {
  const response = await service.post("/user/login", {
    userName: data.value.userName,
    pwd: data.value.pwd,
  });
  return response.data;
};

export const postRegister = async (data) => {
  const response = await service.post("/user/register", {
    userName: data.value.userName,
    pwd: data.value.pwd,
  });
  return response.data;
};

// export const postLogout = async (data) => {
//   await service.post("/user/post", {});
// };
