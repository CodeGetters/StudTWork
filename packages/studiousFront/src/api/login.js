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
