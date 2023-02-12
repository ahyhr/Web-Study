import { RouteRecordRaw } from "vue-router";
import router, { dynamicRouter, notFoundRouter } from "./index";
const modules = import.meta.glob("@/views/**/*.vue");

export function recursionRouter(userRouter: any[] = [], allRouter: RouteRecordRaw[] = []) {
  const realRoutes: RouteRecordRaw[] = [];
  allRouter.forEach((val, index) => {
    userRouter.forEach((item) => {
      if (item.name === val.meta?.name) {
        if (item.children && item.children.length > 0) {
          val.children = recursionRouter(item.children, val.children);
        }
        realRoutes.push(val);
      }
    });
  });
  return realRoutes;
}

export function initRouter(dynamicRouter: RouteRecordRaw[]) {
  dynamicRouter.forEach((item) => {
    //   item.component = modules[`/src/views/${String(item.name)}/${String(item.name)}.vue`];
    router.addRoute("layout", item);

    // if (item.children && item.children.length) {
    //   initRouter(item.children);
    // }
  });
  router.addRoute("layout", notFoundRouter);
}
