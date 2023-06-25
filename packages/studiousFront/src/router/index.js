/*
 * @Descripttion: 总路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-24 19:13:29
 */
import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/HomePage.vue");
const Login = () => import("../views/LoginPage.vue");
const routes = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    component: Home,
    meta: { transition: "slide-right" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { transition: "slide-right" },
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
