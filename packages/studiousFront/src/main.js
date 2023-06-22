/*
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-22 14:11:32
 */
import { createApp } from "vue";
import pinia from "./store/index";
import router from "./router/index";

// 初始化样式表
import "normalize.css";

import i18n from "./i18n/index";

import App from "./App.vue";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
