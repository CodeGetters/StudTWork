/*
 * @Description:工具函数
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 15:04:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-25 17:11:40
 */

export const changTheme = (theme) => {
  // 默认 dark
  if (!theme) {
    document.documentElement.setAttribute("theme", "dark");
    console.log("切换1");
  } else {
    document.documentElement.removeAttribute("theme");
    console.log("切换2");
  }
};
