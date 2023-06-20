<script setup>
import HelloWorld from "./components/HelloWorld.vue";
// import { ElConfigProvider } from "element-plus";

import { Check } from "@element-plus/icons-vue";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <el-button :type="success" :icon="Check" circle />
  <HelloWorld msg="Vite + Vue" />
  <div class="icon">
    <IconHomeUser style="width: 100%; height: 100%" />
  </div>
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
