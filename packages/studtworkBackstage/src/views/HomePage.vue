<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 23:17:48
-->
<script setup>
import { changeTheme } from "@/utils/index.js";
</script>

<template>
  <div id="HomePage">
    <HelloWorld />
    <button @click="changeTheme()">切换到 Hello 页</button>
  </div>
</template>

<style lang="less">
#HomePage {
  background-color: var(--bgc);
}
</style>
