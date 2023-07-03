/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-03 14:37:40
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 15:47:07
 */
import { defineStore } from "pinia";

const useAuthStore = defineStore("token", {
  state: () => ({
    Authorization: localStorage.getItem("Authorization") || null,
  }),
  actions: {
    async setToken(Authorization) {
      this.Authorization = Authorization;
      localStorage.setItem("Authorization", Authorization);
    },
    async clearToken() {
      this.Authorization = null;
      localStorage.clear("Authorization");
    },
  },
  getters: {},
  persist: {
    key: "Authorization",
    storage: localStorage,
  },
});
export default useAuthStore;
