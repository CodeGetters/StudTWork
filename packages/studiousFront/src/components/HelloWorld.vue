<!--
 * @Description: 示例组件
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 20:30:52
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 22:23:39
-->
<script setup>
defineProps({
  msg: { type: String, default: "vue + Vite" },
});

const count = ref(0);

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
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <a href="">HomePage</a>
  <img src="@/assets/logo.svg" class="logo vue" alt="Vue logo" />

  <el-button :icon="Check" circle />
  <div class="icon">
    <IconHomeUser style="width: 100%; height: 100%" />
  </div>
  <div>API:{{ api }}</div>

  <input :placeholder="$t('test')" type="text" />
  <div>{{ $t("language.zh") }}</div>
  <div>{{ $t("language.en") }}</div>

  <router-link to="/login"><button>LOGIN</button></router-link>

  <!-- elelment：国际化示例 -->
  <!-- <div>
    <el-button mb-2 @click="toggle">Switch Language</el-button>
    <br />

    <el-config-provider :locale="locale">
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" />
    </el-config-provider>
  </div> -->
</template>

<style scoped lang="less">
.read-the-docs {
  color: @againTest;
}

div {
  background-color: @test-global;

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
    filter: drop-shadow(0 0 2em #38a7f8);
  }
}
</style>
