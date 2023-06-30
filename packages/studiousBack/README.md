# KOA

```txt
$ tree -I 'node_modules'
.
|-- LICENSE
|-- README.md
|-- app.js               // 项目入口
|-- package.json
`-- src
    |-- controllers      //控制器(用于接收用户模块的接口请求)
    |-- db               // 数据库相关
    |-- globalConfig.js  // 全局配置文件
    |-- models           // 数据库表结构
    |-- log              // log 日志存放
    |-- utils            // 工具函数
    `-- router           // 项目路由
```

jsonwebtoken---生成 token
koa-jwt---对 jsonwebtoken 的进一步封装，实现检验

## realize koa2

[参考](https://juejin.cn/post/7125867746172076069#heading-13)
