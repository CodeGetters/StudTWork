/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-07 18:14:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-07 22:54:08
 */
import { defineConfig, preprocessCSS } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";

import { fileURLToPath, URL } from "node:url";

// import { viteMockServe } from "vite-plugin-mock";

import UnoCSS from "unocss/vite";

import checker from "vite-plugin-checker";

import VueDevTools from "vite-plugin-vue-devtools";

// import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {},
  },
  build: {
    rollupOptions: {},
  },
  css: {},
  plugins: [
    vue(),
    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
    AutoImport({
      imports: ["vue"],
    }),
    // https://github.com/vbenjs/vite-plugin-mock
    // viteMockServe({
    //   mockPath: "./src/mock",
    //   enable: false,
    // }),
    // https://github.com/unocss/unocss
    UnoCSS(),
    // https://github.com/fi3ework/vite-plugin-checker
    checker({
      typescript: true,
    }),
  ],
});
