/*
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-19 22:16:29
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-01 07:24:10
 */

import { defineConfig, loadEnv } from "vite";
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

import viteCompression from "vite-plugin-compression";

import { VitePWA } from "vite-plugin-pwa";

// import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const VITE_BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL;

  return defineConfig({
    base: "/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    server: {
      proxy: {
        "/api/": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
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
      // 静态资源合并打包
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
          // 静态资源分拆打包---视频等超大文件
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
        // 清除 console 和 debugger
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              "src/styles/variables.less"
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
      // https://github.com/webfansplz/vite-plugin-vue-devtools
      // VueDevTools(),
      // https://github.com/antfu/unplugin-auto-import
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
      // https://github.com/antfu/unplugin-vue-components
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
      // gzip 静态资源压缩---处理大文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      // https://github.com/vite-pwa/vite-plugin-pwa/blob/main/src/types.ts
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "StudTWork",
          short_name: "StudTWork",
          description: "blog system which named StudTWork",
          lang: "zh",
          includeAssets: ["favicon.svg"],
          icons: [
            {
              src: "/pwa-192x192.png",
              size: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              size: "512x512",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
  });
};
