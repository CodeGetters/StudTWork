<!--
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-23 19:32:54
-->
<script setup>
import service from "../api";
import { ref, onMounted } from "vue";

// 发送请求的两种写法
service
  .get("/router")
  .then(function (res) {
    console.log(res.data);
  })
  .catch(function (err) {
    console.log(err);
  });

const data = ref(null);

const fetData = ref(null);

// 发送请求的两种写法
const fetchData = async () => {
  try {
    const res = await service.get("/");
    fetData.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchData();
});

service
  .get("/")
  .then((res) => {
    data.value = res.data;
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<template>
  <div id="loginPage">
    LoginPage
    <!-- <router-link to="/"> -->
    <button class="button">首页</button>
    <!-- </router-link> -->
    <div class="login">{{ data }}数据</div>
    <div class="login">{{ fetData }}</div>
  </div>
</template>

<style scoped lang="less">
.button {
  color: red;
}
</style>
