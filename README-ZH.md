# StudTWork

[English](./README.md) | 简体中文

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCodeGetters%2FstudTBack.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FCodeGetters%2FstudTBack?ref=badge_shield)

> 一个使用前后台使用 [Vue3.3](https://github.com/vuejs/core) + [Vite](https://github.com/element-plus/element-plus)，后端使用 [koa2](https://github.com/koajs/koa) 构建打造的博客前后台系统。

## 下载

你应该有:

- node >= `16`

- pnpm >= `8`

```shell
$ git clone https://github.com/CodeGetters/studTBack.git

# 推荐使用 pnpm
$ pnpm install

# 或者 npm

$ npm install
```

## Usage

```shell
# 后台
$ pnpm dev:front

# 后端
$ pnpm dev:back

# 打包
$ pnpm build:front

# 或者你想打包有 mock 数据的后台项目
$ pnpm build:front-mock
```

## 贡献

如果你愿意做项目中的 `TODO` 中的内容，请将你的 `pr` 提交到 `dev` 分支 👀

最重要一点：请在提交代码前运行一下命令检查代码 🤞

```shell
# 这样会避免让你的代码不会被重置
$ pnpm lint
```

## 许可证

Apache 2.0

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCodeGetters%2FstudTBack.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FCodeGetters%2FstudTBack?ref=badge_large)
