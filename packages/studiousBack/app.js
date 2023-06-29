/*
 * @Descripttion:app 请求响应主体
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 20:30:52
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-29 23:09:19
 */
const koa = require("koa");
const cors = require("koa-cors");
const port = require("./src/config/globalConfig").port;

// https://github.com/koajs/convert/blob/master/README.md
// https://github.com/koajs/convert#migration
// const convert = require("koa-convert");

const app = new koa();

const Router = require("./src/router/index");

app.use(cors());

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(async (ctx) => {
  ctx.body = "hello woeld";
});

app.use(Router.routes(), Router.allowedMethods());

app.listen(port);

console.log(`http://127.0.0.1:${5000}`);
