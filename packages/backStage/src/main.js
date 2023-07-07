/*
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 22:35:56
 */
import { createApp } from "vue";
import pinia from "./store/index";
import router from "./router/index";

// 初始化样式表
import "normalize.css";

import i18n from "./i18n/index.js";

import App from "./App.vue";

import "@/mock/index";

import "animate.css";

// 全局样式
import "./styles/common.less";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
