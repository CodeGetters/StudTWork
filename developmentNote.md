# 开发笔记

## 开发准备

- monorepo 架构

- eslint+prettier

代码检查

- husky+lint-staged

代码预检查

## 前端依赖

- vue-router

路由管理

- pinia

状态管理

- element-plus

按需引入

- normalize.css

样式默认值预设

- vue-i18n

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

- element-plus 国际化

Element Plus 组件 默认 使用英语

[element-plus 国际化](https://element-plus.gitee.io/zh-CN/guide/i18n.html)

[i18n 配置---Config Provider](https://element-plus.gitee.io/zh-CN/component/config-provider.html)
