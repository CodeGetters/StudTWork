/*
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-19 22:16:29
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-24 17:08:02
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath, URL } from "node:url";

import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";

import postcssPresetEnv from "postcss-preset-env";

import path, { resolve } from "node:path";

// import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  test: {
    include: ["test/**/*.test.js"],
    globals: true,
    deps: {
      inline: ["@vue", "element-plus"],
    },
  },
  build: {
    rollupOptions: {
      // 确保外部化处理不想打包进库的依赖
      external: ["element-plus"],
      output: {
        // 入口文件名
        entryFileNames: "assets/js/[name].js",
        // 块文件名
        chunkFileNames: "assets/js/[name]-[hash].js",
        // 资源文件名
        assetFileNames: "assets/[ext]/[name]-[hash]-.[ext]",
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/styles/var.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/components", "src/store"],
      vueTemplate: true,
    }),
    Icons({
      autoInstall: true,
      compiler: "vue3",
      customCollections: {
        home: FileSystemIconLoader("./src/assets/home", (svg) =>
          svg.replace(/^<svg /, "<svg fill='currentColor' ")
        ),
      },
    }),
    Components({
      extensions: ["vue", "md"],
      dts: "src/components.d.ts",
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "icon",
          enabledCollections: ["home"],
        }),
      ],
    }),
    // viteMockServe({
    //   // 设置模拟文件的存储文件夹
    //   mockPath: "./mock/",
    //   // 是否启用 mock 功能
    //   enable: true,
    //   supportTs: false,
    //   logger: false,
    // }),
  ],
});
