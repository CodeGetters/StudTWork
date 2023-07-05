/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-04 21:53:24
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
 * @description 用户登录
 * @param {*} data
 * @returns res
 */
export const postLogin = async (data) => {
  // TODO:在登录时获取用户 ip 地址，并将 ip 地址转成实际地址||调用获取用位置第三方接口
  // TODO:获取到用户的市级地址
  // TODO：将用户的地址存储到后端记录起来---位置模型
  // TODO：后台通过调用位置模型接口渲染饼形图、条形图、折线图等等
  // const getIp = async () =>
  //   fetch("https://api.ipify.org?format=json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const ipAddress = data.ip;
  //       console.log(`IP 获取成功 Address: ${ipAddress}`);
  //       return ipAddress;
  //     })
  //     .catch((error) => {
  //       console.error("ip 地址获取失败:", error);
  //     });

  // const response1 = await fetch("https://api.ipify.org?format=json");
  // if (!response1.ok) {
  //   throw new Error("Network response was not ok");
  // }
  // const data1 = await response1.json();
  // const address = data1.ip;
  // console.log(`IP 地址获取成功: ${address}`);

  const response = await service.post("/user/login", {
    userName: data.value.userName,
    pwd: data.value.pwd,
  });
  return response.data;
};

/**
 * @description 用户注册
 * @param {*} data
 * @returns
 */
export const postRegister = async (data) => {
  const response = await service.post("/user/register", {
    userName: data.value.userName,
    pwd: data.value.pwd,
  });
  return response.data;
};

// TODO:修改密码 api
export const postChange = async (data) => {
  const response = await service.post("/user/update", {
    userName: data.value.userName,
    newPwd: data.value.newPwd,
  });
  return response.data;
};
