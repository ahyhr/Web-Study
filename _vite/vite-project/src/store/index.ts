import { dynamicRouter } from "@/router";
import { initRouter, recursionRouter } from "@/router/permission";
import { defineStore, createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { RouteRecordRaw } from "vue-router";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      appid: "wxcbd7811446b1a759",
      redirect_uri: "https://ztcy.huimaibuy.com/h5",
      routers: [] as RouteRecordRaw[],
      menuList: [
        { name: "订单管理" },
        { name: "订单列表" },
        { name: "测试", children: [{ name: "骨架屏" }, { name: "布局" }] }
      ]
    };
  },
  actions: {
    setRouter() {
      // 比对路由表
      const realRoutes = recursionRouter(this.menuList, dynamicRouter);
      // 添加路由
      initRouter(realRoutes);
      this.routers = realRoutes;
    },
    reloadRouter() {
      initRouter(this.routers);
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { key: "appid", paths: ["appid"], storage: sessionStorage },
      { key: "routers", paths: ["routers"], storage: sessionStorage },
      { key: "menuList", paths: ["menuList"], storage: sessionStorage }
    ]
  }
});

const pinia = createPinia().use(piniaPluginPersist);

export default pinia;
