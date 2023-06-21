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
