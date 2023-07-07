<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-07 10:52:30
-->
<script setup>
// import { changeTheme } from "@/utils/index.js";
import LeftMenu from "../layouts/LeftMenu.vue";
import TopNavbar from "../layouts/TopNavbar.vue";
</script>

<template>
  <div id="HomePage">
    <TopNavbar />
    <div class="contentBox">
      <LeftMenu />
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
#HomePage {
  height: 100vh;
  width: 100%;
  min-width: 375px;

  .contentBox {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
