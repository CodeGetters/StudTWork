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

在 App.vue 中引入了该文件---可能会造成一些问题(比如样式臃肿？？？)后续再解决吧---(已解决！)

- 原因

.gitignore 文件加了默认注释，导致了部分文件没有上传到 github

## RollupError: Could not resolve "./language/index" from "src/main.js"

- 描述

这是使用了 vue-i18n 做的国际化语言配置文件夹，导致 vercel 部署出错

- 原因

.gitignore 文件加了默认注释，导致了部分文件没有上传到 github

## unplugin-icons 插件无法修改 icon 的颜色

- 描述

根据官网文档的说明，在 vite.config.js 中配置，但是在引用的时候无法修改 icons 的颜色，配置如下：

```js
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";

plugin: [
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
];
```

引用代码如下：

```vue
<templeate>
  <div class="icon">
    <IconHomeUser style="width: 100%; height: 100%" />
  </div>
</templeate>

<style>
.icon {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  color: red;
  user-select: none;
}
</style>
```

## [less] variable @test-global is undefined

- 描述

在考虑到后面的主题色切换的需求，想到了使用 less 全局变量在控制主题色。但是全局变量文件并不能在 main.js 中直接引用---"xxx" is undefined

- 解决

less 全局变量文件需要在 vite.config.js 中声明文件所在地址，当然声明全局变量有两种，我选择了外部文件来存储全局变量，配置如下。

```js
import path, { resolve } from "node:path";

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // -----------全局 less 变量配置 2 ------------
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/styles/var.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
```

## TypeError:Unknown file extension ".css" for "..."

- 描述

在测试 js 文件中引入的 .vue 组件时，vitest 终端报错：

```text
TypeError:Unknown file extension ".css" for  D:\软件类存储地\桌面\totalCode\Vue\repo\studiousBack\node_modules\.pnpm\registry.npmmirror.com+element-plus@2.3.6_vue@3.3.4\node_modules\element-plus\theme-chalk\base.css
```

- 解决

乍一看好像是因为文件后缀名不认识 `.css`，在社区中发现这是没有将 `element-plus` 依赖加入 `deps.inline`中，然后重新执行测试

```js
test: {
  include: ["test/**/*.test.js"],
  globals: true,
  deps: {
    inline: ["@vue","element-plus"],
  },
},
```
