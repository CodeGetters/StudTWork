/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 20:10:22
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 11:47:40
 */

const { Sequelize } = require("sequelize");

const { host, dialect, port, username, password, database } =
  require("../config/globalConfig").dataBase;

console.log("init sequelize...");

// Error: ER_ACCESS_DENIED_ERROR: Access denied for user ‘root‘@‘localhost‘ (using password: YES)
// 本地 mysql 配置没有搞好
// const sequelize = new Sequelize("database", "username", "password", {}

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  pool: {
    // 连接池最大连接数量
    max: 500,
    // 最小连接数量
    min: 0,
    // 如果一个线程 10s 内没有被使用过就释放
    idle: 10000,
  },
  define: {
    // 是否自动添加时间戳
    timestamps: false,
    freezeTableName: true,
  },
});

// 测试
sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败", err);
  });

// TODO:暂时导出 sequelize
module.exports = sequelize;