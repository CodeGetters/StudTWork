# realize TS in this project

To get the most standard mode, I install the dependency in this project:`vite-plugin-checker` to improve code specification

hear are some of the problem I encountered.

## Cannot find module './App.vue' or its corresponding type declarations

- 描述

(新项目)刚下载完运行就发生了这个错误。

- 解决

来源：[StackOver](https://stackoverflow.com/questions/70895690/ts2307-cannot-find-module-app-vue-or-its-corresponding-type-declarations)：
在 `src/` 下面中创建 `shims-vue.d.ts` 文件，并在里面写入 vue 的声明文件就解决了：

```ts
declare module "*vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "*vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

至于说这段代码的作用后面再看吧！
