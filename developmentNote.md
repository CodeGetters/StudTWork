# 开发笔记

## 开发准备

- monorepo 架构

- eslint+prettier

代码检查

- husky+lint-staged

代码预检查

## 前端依赖

### vue-router

路由管理

### pinia

状态管理

### element-plus

按需引入

### normalize.css

样式默认值预设

### vue-i18n

国际化语言支持

```shell
pnpm -F @studious/front add vue-i18n
```

在 src/language 下的 locales 中分别创建 zh en 两个语言包(两个语言包要保证相同)，并导出到 language/index.js

```js
// index.js
import { createI18n } from "vue-i18n";
import enUS from "./locales/en";
import zhCN from "./locales/zh-CN";

const i18n = createI18n({
  legacy: false,
  // 默认显示语言
  locale: "zh-cn",
  // 添加多语言
  messages: {
    "zh-cn": zhCN,
    "en-us": enUS,
  },
});

export default i18n;

// 接着我们将 i18n 全局注册
// main.js

import i18n from "./language";
app.use(i18n);
```

完成以上步骤后，我们就可以在 vue 组件中使用了，一下使用示例

```vue
<setup setup>
import i18n from "../language";

console.log("中文：", i18n.global.t("language.zh"));
</setup>

<template>
  <input :placeholder="$t('test')" type="text" />
  <div>{{ $t("language.zh") }}</div>
</template>
```

### element-plus 国际化

Element Plus 组件 默认 使用英语

[element-plus 国际化](https://element-plus.gitee.io/zh-CN/guide/i18n.html)

[i18n 配置---Config Provider](https://element-plus.gitee.io/zh-CN/component/config-provider.html)

### less 全局变量

vite 4 已经内置了 less、scss 文件得内置支持，所以我们无需引入相应的 loader 依赖只需安装响应的预处理器依赖

```shell
npm install less -D
```

在 vite.config.js 中加入如下配置

```js
css: {
    preprocessorOptions: {
      less: {
        // -----------全局 less 变量配置 1 -------------
        math: "alwayls",
        globalVars: {
          dark: "#000",
        },
        // -----------全局 less 变量配置 2 ------------
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/styles/var.less')}";`,
        },
        javascriptEnabled: true,
      },
    }
}
```

以上是配置 less 全局变量两个方法一个是引入外部的全局变量，是就在之这里直接声明使用

### 静态资源合并打包

[相关文章](https://blog.csdn.net/shinjie1210/article/details/122473024)

这里是通过 rollup 配置将打包后的文件进行一个文件整理，比如 js 文件会放在 js 文件夹中，css 文件会放在 css 文件夹中...

```js
build:{
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
}
```

### 路由跳转过渡

name 值是过渡动画的前缀

`component` 中的 is 属性值一定要和最外层的 `router-view` 中的 v-slot 值相同

```vue
<template>
  <!-- 关于路由过渡参照：https://blog.csdn.net/fang_my/article/details/125578420 -->
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
```

### 主题色动态切换

关于主题色的切换，我最初想的是在 variables.less 根据一个 @theme 变量值来条件导入不同的主题文件：

```less
@theme: true;

@if (@theme=true) {
  @import url(light.less);
} @else {
  @import url(dark.less);
}
```

或者是：

```less
@theme:true;

import "./styles/@{theme}.less";
```

以上两种都是在 less 文件中使用一个 less 变量来条件引入对应的 less 文件，接着就会引出新的问题---如何改变该对应的全局变量？
我尝试在一个 .vue 文件中去修改 less 全局变量(当然，在 `style` 标签中没有声明 `scoped` 使得样式隔离)。
很遗憾的是，由于 less 的原因这样并不能成功来实现条件导入 less 文件。

或许，有伙伴会问为什么你不直接在 App.vue 文件中使用 JS 条件导入全局样式变量。是的，这方面我也考虑过，但我的全局 less 变量是并不是导入在 main.js 中的。
我是在 vite.config.js 中的 css 统一处理全局变量的，我也尝试过在 App.vue 中引入全局变量文件(vite 已经[内置了 less 的支持](https://cn.vitejs.dev/guide/features.html#css-pre-processors)，就没有使用以往的 less loader)。当然就不清楚该怎么配置使得全局 less 变量能够在 main.js 中统一导入(这样就会报错---[less]:not found xxx variable)。

综合以上的考虑我决定放弃使用条件导入 less 样式变量，而是使用 css3 的特性(也考虑过使用进行条件导入，很遗憾也会报错)：

```less
root: {
  @import url(light.less);
}

:root[theme="dark"] {
  @import url(dark.less);
}
```

最后还是老老实实的使用 css3 吧：

```less
// 黑白主题变量
:root {
  --textColor: #007fdf;
  --bgc: linear-gradient(45deg, #c1deff 4.69%, #e0eeff 26.56%, #e5f8fb 87.13%);
}

:root[theme="dark"] {
  --textColor: #fff;
  --bgc: #000;
}
```

使用 css3 特性主要就是在根节点中添加或移除 class 来达到切换主题的效果，这这样会导致一个弊端---用户无法使用选色板来自定义颜色，这个就后面在使用 JS 看看能不能实现吧

当然在这个实现这个功能的时候也发现了比较好的替代---[vueUse](http://www.vueusejs.com/core/useDark/)，这会导致额外的引入依赖，就放弃用这个的想法。
以后有时间再试一下这个。

实现了全局 less 变量的切换后，那我们该如何实现切换的功能呢。认真看的小伙伴肯定是知道我是使用一个函数来动态移除或添加类的：

```js
export const changTheme = (val) => {
  if (!val) {
    document.documentElement.setAttribute("theme", "dark");
  } else {
    document.documentElement.removeAttribute("theme");
  }
};
```

最开始我是想用 ref 变量传进这个函数里面，并且在这个函数里修改 ref.value 值来实现多次切换主题。后面我就想怎么讲这个持久化，
我就想到了 pinia 状态管理，将这个变量交给它统一管理。这样不仅不用写多个重复的函数，还能全局管理。真香！😍
后来看了一下别人的主题切换方案(主题切换持久化---将控制主题的变量存储在浏览器中，每次用户打开进行判断)，这也是后面要实现的目标了。🚀

### 开发环境下 Mock 数据

在增加 mock 来实现请求拦截模拟数据时，最初在 bing 中看到最多的还是 mock + vite-plugin-mock 配合使用。但是我使用这个方案时发现会报错：

```js
export default [
  {
    url: '/mock/api/getList',
    method: 'post',
    response: () => {
      return logList;
    },
  },
  {
    url: '/mock/api/getStatusList',
    method: 'get',
    response: () => {
      return statusList;
    },
  },
] as MockMethod[];
```

报错信息：mock/index.js:20:2: ERROR: Expected ";" but found "as"。因为对这个问题有些表示无从下手，我只好放弃使用该方案，老老实实使用 mock。
只使用 mock 无需在 vite.config.js 中配置，只需在 `src` 下新建 mock 目录，并将 mock 导入到 main.js 中

```js
// mock.js
import Mock from "mockjs";

// 获取环境变量
let BaseURL = import.meta.env.VITE_BASE_URL;

// 如果是生产环境取消模拟数据
if (import.meta.env.MODE === "production") {
  BaseURL = "";
}

Mock.mock(BaseURL + "/", "get", {
  status: 200,
  data: "Mock successful!",
});

Mock.mock(BaseURL + "/router", "get", {
  status: 200,
  data: {
    name: "@cname",
    info: "Mock successful!",
  },
});

// main.js
import "@/mock/index";
```

这里需要注意一点：由于 mock 没有像 vite-plugin-mock 一样能够根据模式不同而避免打包我们的 mock 文件，所以这里需要判断开发环境还是生产环境来避免生产环境下拦截请求和模拟数据。

当然，这并不是一帆风顺的，由于我的请求地址都放在了 .env 文件中，所以我需要从环境变量文件中拿到请求地址。
同时，我还需要判断开发环境和生产环境，因为生产环境是不需要 mock 拦截请求和模拟数据的。所以我重新配置了一下 vite.config.js，让 vite 能够根据模式不同而读取地址。

```js
// vite.config.js
export default ({ mode }) => {
  const VITE_BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL;

  return defineConfig({
    base: "/",
    // ...
    server: {
      proxy: {
        "/api/": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
```

需要注意的是：[Vite 会根据模式不同来读取 env 文件](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

同时，我还在 package.js 中增加了有 mock 数据的打包命令

```js
pnpm build:front-mock
```
