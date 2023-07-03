/*
 * @Description-en:tool function
 * @Description-zh:工具函数
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 15:04:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 20:31:53
 */

import useThemeStore from "../store/theme";

const theme = useThemeStore();
let timer = null;

export const changeTheme = () => {
  if (!theme.isDark) {
    timer = setTimeout(() => {
      document.documentElement.setAttribute("theme", "dark");
      // 切换
      theme.toggleTheme();
    }, 500);
  } else {
    timer = setTimeout(() => {
      document.documentElement.removeAttribute("theme");
      theme.toggleTheme();
    }, 500);
  }
};
clearTimeout(timer);

export const recallTheme = () => {
  if (theme.isDark) {
    document.documentElement.setAttribute("theme", "dark");
  } else {
    document.documentElement.removeAttribute("theme");
  }
};
// const lang = useLangStore();

// export const changeLang = () => {
//   // 默认 zh-cn
// };
