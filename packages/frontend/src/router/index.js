/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-08 10:49:46
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-08 13:58:18
 */
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
// RouterRecordRaw   是路由组件对象
// RouterOptions     是路由选项类型
// Router            是路由对象类型
const Home = () => import("../pages/HomePage.vue");
const NotFound = () => import("../pages/NotFound.vue");
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
const option = {
  history: createWebHistory(),
  routes,
};
const router = createRouter(option);
// router.beforeEach((to, from, next) => {
//   // if(to.path==="")
//   next();
// });
export default router;
