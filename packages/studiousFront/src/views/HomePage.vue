<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-25 17:08:54
-->
<script setup>
import { changTheme } from "@/utils/index.js";
</script>

<template>
  <div id="HomePage">
    <HelloWorld />
    <button @click="changTheme()">切换到 Hello 页</button>
  </div>
</template>

<style lang="less">
#HomePage {
  background-color: var(--bgc);
}
</style>
