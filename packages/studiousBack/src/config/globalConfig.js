/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:47:22
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-29 22:55:27
 */
const defineConfig = {
  port: 5000,
  dataBase: {
    port: 3306,
    username: "root",
    password: "MySQL123456!",
    host: "localhost",
    dialect: "mysql",
    database: "studTwork",
  },
};

module.exports = defineConfig;
