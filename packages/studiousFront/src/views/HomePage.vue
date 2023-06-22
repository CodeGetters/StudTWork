<!--
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-22 14:03:55
-->
<script setup>
import { ref, computed } from "vue";
import { Check } from "@element-plus/icons-vue";
const api = import.meta.env.VITE_BASE_URL;

// vue-i18n国际化
import i18n from "@/i18n/index.js";
console.log("中文：", i18n.global.t("language.zh"));

// element-plus 组件国际化
const lang = ref("zh-cn");
import zhCN from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
const locale = computed(() => (lang.value === "zh-cn" ? zhCN : en));
const toggle = () => {
  lang.value = lang.value === "zh-cn" ? "en" : "zh-cn";
};
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
  <div>API:{{ api }}</div>

  <input :placeholder="$t('test')" type="text" />
  <div>{{ $t("language.zh") }}</div>

  <!-- elelment：国际化示例 -->
  <div>
    <el-button mb-2 @click="toggle">Switch Language</el-button>
    <br />

    <el-config-provider :locale="locale">
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" />
    </el-config-provider>
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
