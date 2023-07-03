/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 20:27:53
 */
import { defineStore } from "pinia";

const useThemeStore = defineStore("isDark", {
  state: () => ({
    isDark: false,
  }),
  persist: {
    key: "isDark",
    storage: localStorage,
  },
  actions: {
    toggleTheme() {
      const theme = JSON.parse(localStorage.getItem("isDark"));
      if (theme !== null) {
        this.isDark = !theme.isDark;
      } else {
        this.isDark = true;
        JSON.stringify(localStorage.setItem("isDark"));
      }
    },
  },
  getters: {},
  setter: {},
});

export default useThemeStore;
