/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 23:29:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 11:53:19
 */
const baseController = require("./index");

const userModel = require("../models/user");

class userController extends baseController {
  static async getUser(ctx) {
    const res = await userModel.findAll({
      // 限制
      // where: {
      // status: 1,
      // },
      // 分页
      // limit: 1,
    });
    ctx.body = baseController.renderJsonSuccess(200, res);
  }

  static async getUserDetail(ctx) {
    const id = ctx.params.id;

    let msg = "输入错误";
    let code = 200;
    if (parseInt(id) === 666) {
      msg = "输入正确";
    }
    let data = ["userController"];

    ctx.body = baseController.renderJsonSuccess(code, msg, data);
  }
}

module.exports = userController;
