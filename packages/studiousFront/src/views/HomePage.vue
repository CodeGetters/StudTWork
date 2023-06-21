<!--
 * @Descripttion:主页
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-21 16:59:42
-->

<script setup>
import { Check } from "@element-plus/icons-vue";
const api = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <div id="HomePage">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="">HomePage</a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <el-button :type="success" :icon="Check" circle />
  <HelloWorld msg="Vite + Vue" />
  <div class="icon">
    <IconHomeUser style="width: 100%; height: 100%" />
  </div>
  <div>{{ api }}</div>
</template>

<style scoped lang="less">
div {
  .icon {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    color: red;
    user-select: none;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
