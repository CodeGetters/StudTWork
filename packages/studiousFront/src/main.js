/*
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-21 16:59:23
 */
import { createApp } from "vue";
import pinia from "./store/index";
import router from "./router/index";

// 初始化样式表
import "normalize.css";
// 全局样式表
import "./styles/index.less";
import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
