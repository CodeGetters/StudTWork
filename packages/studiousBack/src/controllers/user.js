/*
 * @Description-en:user controller
 * @Description-zh:用户中间层
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 23:29:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-01 10:39:35
 */
const baseController = require("./index");

const userModel = require("../models/user");

class userController extends baseController {
  // 创建用户
  static async createUser(ctx) {
    let msg = "创建成功";
    let code = 200;
    const { userName, pwd } = ctx.request.body;

    const isExist = await userModel.findOne({
      where: {
        userName,
      },
    });

    // 检验是否存在
    if (isExist) {
      msg = "用户已经存在，创建失败";
      code = 400;
    } else {
      console.log("用户不存在，可以创建");
      userModel.create({
        userName,
        pwd,
      });
    }

    ctx.body = baseController.renderJsonSuccess(code, msg);
  }

  // 获取用户信息
  static async getUser(ctx) {
    const res = await userModel.findByPk("");
    ctx.body = baseController.renderJsonSuccess(200, "查找成功", res);
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
