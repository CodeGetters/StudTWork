/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-08 10:49:46
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-08 14:27:31
 */

import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterOptions,
  Router,
} from "vue-router";
import HomePage from "../pages/HomePage.vue";

// RouterRecordRaw   是路由组件对象
// RouterOptions     是路由选项类型
// Router            是路由对象类型

const Home = () => import("../pages/HomePage.vue");
// const NotFound = () => import("../pages/NotFound.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: NotFound,
  // },
];

const option: RouterOptions = {
  history: createWebHistory(),
  routes,
};

const router: Router = createRouter(option);

// router.beforeEach((to, from, next) => {
//   // if(to.path==="")
//   next();
// });

export default router;
