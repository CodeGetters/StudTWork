/*
 * @Description-en:tool function
 * @Description-zh:工具函数
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 15:04:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 23:38:25
 */

import useThemeStore from "../store/theme";

const theme = useThemeStore();
let timer = null;

export const changeTheme = () => {
  // 默认 dark
  if (!theme.isDark) {
    timer = setTimeout(() => {
      document.documentElement.setAttribute("theme", "dark");
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

// const lang = useLangStore();

// export const changeLang = () => {
//   // 默认 zh-cn
// };
