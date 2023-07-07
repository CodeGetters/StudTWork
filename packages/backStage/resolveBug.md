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

## .pnpm-4508a73c.js:1 Uncaught TypeError: Cannot read properties of undefined (reading 'refs')at setRef (.pnpm-4508a73c.js:1:61241)

- 描述

一个夜黑风高的某一天，辛辛苦苦肝了一天，将写好的代码上传到 github，我打开我心爱的 vercel 将他进行部署。
看着部署好的网页，我心血来潮打开我写的页面。首页，很好没有错误！注册页，嗯、？？？怎么一片空白？？？控制台出现这个错误把我美妙的心情都给破坏了！

- 解决

由于这个是打包后的产物，所以 debug 有点难度。我看到这个 bug，想着我也没有用 refs 啊！那就进入 debug

第二阶段---依赖问题，我回顾了一下，这两天我好像并没有在项目中引入依赖，也就早上引入了最近挺火的 vite-plugin-vue-devtools，但是人家都不加入到打包中啊，没关系，我先去掉这个依赖。去掉以后，很好！问题还是没有解决！

进入第三阶段---pnpm，由于他的名字前缀就带有 pnpm 具有迷惑性，那我就将本地的 `node_modules` 全部删掉，重新使用 npm 引入。好家伙，以前没有在 monorepo 项目中使用 npm 进行引入依赖，不用不知道，一用就发现我的项目体积急剧增加。本来之前打包的时候需要用 `vite-plugin-compression` 进行压缩的文件都没有几个，现在多出来好几个。但是想想就知道了，pnpm 可以减少重复包的引用(pnpm 的优点)，当然也不是只有这个优点。这是题外话了，回到我们的主题。我使用了 npm 进行打包操作后，还是没有解决这个问题。

进入第四阶段---代码的问题。打包后的项目首页能够加载出来，并且没有报错，这就说明这只是登录页的问题。所以，我就只好使用老方法了，一段一段的注释重新打包调试了。终于，找到了问题所在之处了：原来是使用了 v-bind 绑定了 ref 即`':ref="ruleForm"'`。

```html
<el-form
  :model="ruleForm"
  status-icon
  :rules="rules"
  :ref="ruleForm"
  label-width="100px"
  class="login-user-info"
>
  <!-- ------------------------------------ -->
  <!-- <el-form-item :label="$t('loginPage.account')" prop="account">
    <el-input
      type="account"
      v-model="ruleForm.account"
      autocomplete="off"
      :placeholder="$t('loginPage.accountIpt')"
    ></el-input>
  </el-form-item> -->
  <!-- <el-form-item :label="$t('loginPage.password')" prop="pass">
    <el-input
      type="password"
      v-model="ruleForm.pass"
      autocomplete="off"
      :placeholder="$t('loginPage.passwordIpt')"
    ></el-input>
  </el-form-item> -->
  <!-- <router-link to="" class="forget-pwd">
    <span>{{ $t("loginPage.forgetPwd") }}</span>
  </router-link> -->
  <!-- <el-button type="primary" @click="submitForm('ruleForm')">{{
    $t("loginPage.loginForm")
  }}</el-button> -->
  <!-- ---------------------------------- -->
</el-form>
```

## Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with packages/studtworkBackend/package.json

- 描述

由于重命名了一下项目，导致出现了部署、打包等问题

- 解决

重命名后，需要将全部的 package 文件中的名字都改了，并且删除 lock 和依赖重新上传，同时还需要更改一下打包后的文件夹

## 打包后图片加载失败

- 描述

将项目中用到的资源都放到了 `assets` 目录下，开发模式下正常显示。但是打包后却发现图片加载失败

- 解决

根据[官网](https://cn.vitejs.dev/guide/assets.html)的描述，在引入静态资源的时候需要使用 `import` 语句引入静态资源文件才能正确解析文件地址，否则打包后静态资源会无法正常显示。

还有一种方式是将静态资源文件放到根目录下的 `public` 文件中，这样也能够解决这个问题
