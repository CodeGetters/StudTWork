<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-25 21:52:07
-->
<script setup>
import { ref, onMounted } from "vue";

import { fetchData, getHome, getRouter } from "@/api/login";

const data = ref(null);
const fetData = ref(null);
const getRouter1 = ref(null);

onMounted(() => {
  fetchData(fetData);
  getHome(data);
  getRouter(getRouter1);
});

import { changTheme } from "@/utils/index";

import useThemeStore from "../store/theme";

const theme = useThemeStore();
</script>

<template>
  <div id="loginPage">
    <el-row class="login-form">
      <el-col :xs="0" :sm="6" :md="12" :lg="12" class="login-left">
        <router-link to="/">
          <button class="button">首页</button>
        </router-link>

        <div>{{ theme.isDark }}</div>
        <button @click="changTheme()">切换主题</button>
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="12" class="login-right">
        <div class="login">{{ data }}数据</div>
        <div class="login">{{ fetData }}</div>
        <div class="login">{{ getRouter1 }}</div>
      </el-col>
    </el-row>
    <div class="footer">
      <div><span>隐私内容</span> | <span>政策协议</span></div>
      <div>
        Copyright © 2023
        <a href="javascript:;">
          <span>JohnsonXin</span>
        </a>
        &
        <a href="javascript:;">
          <span>泽泽</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#loginPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--bgc);

  .login-form {
    width: 730px;

    .login-left {
      width: 100%;
      background-color: red;
    }

    .login-right {
      width: 100%;
      background-color: green;
    }
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 175px;
    user-select: none;
    color: #007fdf;
  }

  a {
    color: #007fdf;
    text-decoration: none;
    outline: none;
  }
}
.button {
  color: red;
}
</style>
