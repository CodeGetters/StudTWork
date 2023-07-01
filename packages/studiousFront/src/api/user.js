/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-01 18:05:56
 */
import service from "./index";

export function login() {
  return service.get("/");
}

// 发送请求的两种写法

// 有---try---catch---会被捕获 error
export const fetchData = async (data) => {
  const res = await service.get("/");
  data.value = res.data;
};
// 有---try---catch---不会被捕获 error
export const getHome = (data) => {
  service
    .get("/")
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRouter = (data) => {
  service
    .get("/router")
    .then(function (res) {
      data.value = res.data;
      console.log("getHome", res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// 登录
export const getLogin = (data) => {
  service
    .post("/user/login", {
      userName: data.value.userName,
      pwd: data.value.pwd,
    })
    .then(function (res) {
      data.value = res.data;
      console.log("getLogin:", res.data);
    })
    .catch(function (err) {
      // 捕获错误原因
      console.log("response:", err.response);
    });
};
