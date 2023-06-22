<!--
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-22 13:33:40
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-22 13:46:39
-->

# resolve Bug

这里主要会列一些项目中遇到的 bug，以便后面查看

## 打包后出现 Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../"

- 描述

在 vite.config.js 中的 rollupOptions.external 数组中加入了 ["vue","element-plus"]，经过尝试将数组中的 vue 删掉即可

- 原因

未知

## RollupError:could not resolve import "styles/common.less" from "src/main.js"

- 描述

在 main.js 文件中引入 less 全局样式文件导致在 vercel 部署的时候 rollup 出错。

- 解决

在 App.vue 中引入了该文件---可能会造成一些问题(比如样式臃肿？？？)后续再解决吧

- 原因

rollup 处理 less、css 等样式文件需要插件？？？

## RollupError: Could not resolve "./language/index" from "src/main.js"

- 描述

这是使用了 vue-i18n 做的国际化语言配置文件夹，导致 vercel 部署出错

- 原因
