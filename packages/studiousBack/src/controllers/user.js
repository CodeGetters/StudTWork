/*
 * @Description-en:user controller
 * @Description-zh:用户中间层
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 23:29:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 14:20:58
 */
const baseController = require("./index");

const userModel = require("../models/user");

const { createToken, verifyToken } = require("../utils/token");

const { yellow, blue } = require("kolorist");

const { Op } = require("sequelize");

const dayjs = require("dayjs");

// const { getStatic } = require("../utils/localStatic");

class userController extends baseController {
  /**
   * @description 用户注册
   * @param {*} ctx
   */
  static async createUser(ctx) {
    let msg = "";
    let data = [];
    let userInfo = "";

    const { userName, pwd } = ctx.request.body;
    const isExist = await userModel.findOne({
      where: {
        userName,
      },
    });

    // 检验是否存在
    if (isExist) {
      msg = "用户名已存在，注册失败";
      ctx.response.status = 409;

      console.log(yellow("[CREATE USER]:用户名已存在，注册失败"));
    } else {
      try {
        await userModel.create({
          userName,
          pwd,
          registerTime: `${dayjs().format("YYYY-MM-DD HH:mm")}`,
          // 超级管理员 4、管理员 3、普通用户 2、游客 1
          authority: 2,
          role: "普通用户",
        });
        ctx.response.status = 200;

        // 获取用户注册的相关信息
        const lastUser = await userModel.findOne({
          order: [["id", "DESC"]],
          attributes: ["id", "userName", "authority", "role"],
        });
        // token 需要携带的用户信息
        userInfo = {
          id: lastUser.dataValues.id,
          userName,
          authority: lastUser.dataValues.authority,
          role: lastUser.dataValues.role,
        };
        data = { token: await createToken(userInfo) };
        msg = "用户注册成功";
      } catch (err) {
        msg = "用户创建时失败，请重试！";
      }
    }
    ctx.body = baseController.renderJsonSuccess(msg, data);
  }

  /**
   * @description 用户登录
   * @param {*} ctx
   */
  static async userLogin(ctx) {
    let msg = "";
    let userInfo = null;
    let data = "";

    const { userName, pwd } = ctx.request.body;

    // 根据用户名查询用户的 id、账号、密码、权限等级字段
    const userExist = await userModel.findOne({
      attributes: ["id", "userName", "pwd", "authority"],
      where: {
        userName,
      },
    });
    // 没有查询到该用户
    if (userExist === null) {
      msg = "登录失败，用户名不存在";
      ctx.response.status = 404;

      console.log(yellow("[USER LOGIN]:用户名不存在，用户登录失败"));
      // 密码错误
    } else if (pwd !== userExist.dataValues.pwd) {
      msg = "登录失败，密码错误";
      ctx.response.status = 401;

      console.log(yellow("[USER LOGIN]:用户名不存在，用户登录失败"));
    } else {
      // token 携带的用户信息
      userInfo = {
        id: userExist.dataValues.id,
        userName: userExist.dataValues.userName,
        authority: userExist.dataValues.authority,
      };
      console.log(blue("[USER LOGIN]:登录成功"));

      data = {
        token: createToken(userInfo),
        userInfo,
      };
    }

    ctx.body = baseController.renderJsonSuccess(msg, data);
  }

  /**
   * @description 查找权限内的所有用户 比如 用户 A 权限等级为 3，他能查询比它权限等级小的所有用户 2 1
   * @param {*} ctx
   */
  static async getUser(ctx) {
    let msg = "";
    let data = "";
    let userList = "";

    const token = ctx.headers.authorization.split(" ")[1];
    const searchUser = async (userAuthority) => {
      const res = await userModel.findAll({
        attributes: ["id", "userName", "authority", "role", "registerTime"],
        where: {
          authority: {
            // Op.lte 来表示小于等于运算符
            [Op.lte]: userAuthority,
          },
        },
      });
      return res;
    };

    const validToken = verifyToken(token);
    if (validToken) {
      const userAuthority = validToken.authority;

      // 根据权限值不同做不用的事情 游客-用户-管理员-超级管理员
      if (userAuthority === 1) {
        msg = "用户权限等级不够，查询失败";
      } else {
        userList = await searchUser(userAuthority);
        msg = "查询成功";
        ctx.response.status = 200;
      }

      data = {
        users: userList,
      };
    } else {
      msg = "token 已失效，请重新登录";
      ctx.response.status = 404;
    }
    ctx.body = baseController.renderJsonSuccess(msg, data);
  }
}

module.exports = userController;
