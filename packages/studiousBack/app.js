/*
 * @Descripttion:app 请求响应主体
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 20:30:52
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-21 16:43:43
 */
const koa = require("koa");
const cors = require("koa-cors");

const app = new koa();

app.use(cors);
app.use(async (ctx) => {
  ctx.body = "hello world";
});
console.log("http://127.0.0.1:5000");
app.listen(5000);
