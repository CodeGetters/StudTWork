/*
 * @Descripttion: 总路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-21 16:42:11
 */
import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/HomePage.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫
// router.beforeEach((to, from) => {
//   return false;
// });

export default router;
