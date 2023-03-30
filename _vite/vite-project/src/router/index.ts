import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useMainStore } from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  }
];

export const notFoundRouter: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "404",
  component: () => import("@/views/404/404.vue")
};

// 动态路由
export const dynamicRouter: RouteRecordRaw[] = [
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    meta: { name: "订单管理" }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/about.vue"),
    meta: { name: "订单列表" }
  },
  {
    path: "/threejs",
    name: "threejs",
    component: () => import("@/views/threejs/threejs.vue"),
    meta: { name: "three js" }
  },
  {
    path: "/buju",
    name: "AA",
    meta: { name: "测试" },
    children: [
      {
        path: "/buju",
        name: "buju",
        component: () => import("@/views/buju/buju.vue"),
        meta: { name: "布局" }
      },
      {
        path: "/skeleton",
        name: "skeleton",
        component: () => import("@/views/skeleton/skeleton.vue"),
        meta: { name: "骨架屏" }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  // 解决刷新页面空白
  if (!to.name && to.path !== "/login") {
    mainStore.setRouter();
    router.replace(to.path);
    return;
  }
  next();
});

export default router;
