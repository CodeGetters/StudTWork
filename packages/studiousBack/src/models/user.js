/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-30 11:48:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 11:51:47
 */
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/mysql");

// 数据类型：https://www.sequelize.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: DataTypes.STRING,
  status: DataTypes.TINYINT,
});

module.exports = user;
