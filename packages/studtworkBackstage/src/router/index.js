/*
 * @Description: 总路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 16:13:30
 */
import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/HomePage.vue");
const Login = () => import("../views/LoginPage.vue");
const NotFound = () => import("../views/NotFound.vue");
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页 login 放行
  if (to.path === "/login") return next();
  // token 不存在强制跳转到登录页 login
  let token = localStorage.getItem("Authorization");
  if (!token) return next("/login");
  // 4.tokenStr存在放行
  next();
});

export default router;
