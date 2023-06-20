const koa = require("koa");
const cors = require("koa-cors");

const app = new koa();

app.use(cors);
app.use(async (ctx) => {
  ctx.body = "hello world";
});
console.log("http://127.0.0.1:3000");
app.listen(3000);
