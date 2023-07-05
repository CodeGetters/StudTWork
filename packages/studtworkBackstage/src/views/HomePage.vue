<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-05 23:01:14
-->
<script setup>
// import { changeTheme } from "@/utils/index.js";
import TopNavbar from "../layouts/TopNavbar.vue";
</script>

<template>
  <div id="HomePage">
    <!-- <HelloWorld /> -->
    <TopNavbar />
    <!-- <button @click="changeTheme()">切换到 Hello 页</button> -->

    <router-link to="/login">登录</router-link>
  </div>
</template>

<style lang="less">
#HomePage {
  height: 100vh;
  width: 100%;
  min-width: 375px;
  background-color: #ccc;
  // background-color: var(--bgc);
}
</style>
