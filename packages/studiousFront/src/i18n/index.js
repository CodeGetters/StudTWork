/*
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 19:40:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-22 20:34:05
 */
import { createI18n } from "vue-i18n";
import enUS from "./locales/en/en.js";
import zhCN from "./locales/zh/zh.js";

export default createI18n({
  legacy: false,
  // 默认显示语言
  locale: "zh-cn",
  // 添加多语言
  messages: {
    "zh-cn": zhCN,
    "en-us": enUS,
  },
});
