/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 23:30:08
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 11:35:51
 */
// 定一个公共类，类里有一个renderJsonSuccess方法，方便返回数据
class baseController {
  static renderJsonSuccess(code = 200, msg = "", data = []) {
    return {
      code,
      msg,
      data,
    };
  }
}

module.exports = baseController;
