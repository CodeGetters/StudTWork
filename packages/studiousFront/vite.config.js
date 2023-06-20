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
// import postcssPxToViewport from "postcss-px-viewport";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        // eslint-disable-next-line no-undef
        // postcssPxToViewport({
        //   unitToConvert: "px", // 需要转换的单位
        //   viewportWidth: 1080, // 设计稿视口宽度
        //   // viewportHeight: 1920, // 设计稿高度
        //   exclude: [/node_modules/], //忽略某些文件夹下的文件或特定文件
        //   propList: ["*"], // 能转化为 vw 的属性列表---传入通配符匹配所有属性
        //   replace: true, // 直接更换属性值，而不添加备用属性
        //   viewportUnit: "vw", // 希望使用的视口单位
        //   fontViewportUnit: "vw", // 字体使用的视口单位
        //   unitPrecision: 6, // 单位转换后保留的精度
        //   selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
        //   minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        //   mediaQuery: true, // 媒体查询里的单位是否需要转换单位
        //   landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media(orientation:landscape)
        //   landscapeUnit: "vw",
        //   landscapeWidth: 896,
        // }),
      ],
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
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
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "icon",
          enabledCollections: ["home"],
        }),
      ],
    }),
  ],
});
