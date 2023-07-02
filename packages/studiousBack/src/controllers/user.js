/*
 * @Description-en:user controller
 * @Description-zh:用户中间层
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 23:29:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-01 12:18:20
 */
const baseController = require("./index");

const userModel = require("../models/user");

class userController extends baseController {
  // 创建用户
  static async createUser(ctx) {
    let msg = "创建成功";
    const { userName, pwd } = ctx.request.body;

    const isExist = await userModel.findOne({
      where: {
        userName,
      },
    });

    // 检验是否存在
    if (isExist) {
      msg = "用户已经存在，创建失败";
      // 客户端的请求与当前资源的状态（已经存在该用户）发生了冲突。
      ctx.response.status = 409;
    } else {
      console.log("用户不存在，可以创建");
      userModel.create({
        userName,
        pwd,
      });
      ctx.response.status = 200;
    }

    ctx.body = baseController.renderJsonSuccess(msg);
  }

  // 获取用户列表
  static async getUser(ctx) {
    let msg = "查找成功";

    const res = await userModel.findAll({
      attributes: ["userName"],
    });

    // TODO:状态判断
    // if (res.data) {
    //   // 客户端请求了一个资源（全部用户）但是没有找到任何匹配的资源。
    //   // 返回 404 状态码可以告诉客户端资源不存在，从而避免客户端做无用的操作或尝试获取不存在的资源。
    //   msg = "暂无查询到用户，请创建用户";
    //   ctx.response.status = 404;
    // } else {
    //   msg = "查询成功";
    //   ctx.response.status = 200;
    // }

    ctx.body = baseController.renderJsonSuccess(msg, res);
  }

  // TODO:token 判断
  static async userLogin(ctx) {
    let msg = "登录成功";

    const { userName, pwd } = ctx.request.body;

    const userExist = await userModel.findOne({
      attributes: ["userName", "pwd"],
      where: {
        userName,
      },
    });

    if (userExist === null) {
      msg = "登录失败，用户名不存在";
      ctx.response.status = 404;
    } else if (pwd !== userExist.dataValues.pwd) {
      msg = "登录失败，密码错误";
      ctx.response.status = 404;
    }

    ctx.body = baseController.renderJsonSuccess(msg);
  }

  // static async getUserDetail(ctx) {
  //   const id = ctx.params.id;

  //   let msg = "输入错误";
  //   if (parseInt(id) === 666) {
  //     msg = "输入正确";
  //   }
  //   let data = ["userController"];

  //   ctx.body = baseController.renderJsonSuccess(msg, data);
  // }
}

module.exports = userController;
