/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 23:21:48
 */
import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      isDark: false,
    };
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
  getters: {},
  setter: {},
});

export default useThemeStore;
