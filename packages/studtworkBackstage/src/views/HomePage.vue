<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-06 15:44:29
-->
<script setup>
// import { changeTheme } from "@/utils/index.js";
import LeftMenu from "../layouts/LeftMenu.vue";
import TopNavbar from "../layouts/TopNavbar.vue";
</script>

<template>
  <div id="HomePage">
    <!-- <HelloWorld /> -->
    <TopNavbar />
    <div class="contentBox">
      <LeftMenu />
      <router-link to="/login">登录</router-link>
    </div>
    <!-- <button @click="changeTheme()">切换到 Hello 页</button> -->
  </div>
</template>

<style lang="less">
#HomePage {
  height: 100vh;
  width: 100%;
  min-width: 375px;
  background-color: #ccc;

  .contentBox {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
