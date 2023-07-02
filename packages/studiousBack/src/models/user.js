/*
 * @Description-en:model about user
 * @Description-zh:用户相关的模型
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-30 11:48:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-01 11:42:52
 */

// const moment = require("moment");

const { green } = require("kolorist");

const db = require("../db/mysql");
const { sequelize, Model, DataTypes } = db;

class userModel extends Model {}

// 数据类型：https://www.sequelize.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B

// 初始化 User 模型
userModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: "userName",
    },
    pwd: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: "pwd",
    },
  },
  {
    // 传递连接实例
    sequelize,
    // 表 不增加复数名，即 user!=>users
    freezeTableName: true,
    // 模型名称
    modelName: "user",
  }
);

// 自动建表---将表模型定义好后使用一次即可
// userModel.sync({
//   force: true,
// });

// console.log(green("[models]"), `user:${user === sequelize.models.user}`);

module.exports = userModel;
