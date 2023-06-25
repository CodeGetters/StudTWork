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
