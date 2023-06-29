/*
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-23 17:58:01
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-29 15:59:43
 */
const Router = require("@koa/router");

const router = new Router();

router.get("/router", async (ctx, next) => {
  ctx.type = "json";
  ctx.body = {
    code: 200,
    message: "success!",
  };
  return next();
});

module.exports = router;
