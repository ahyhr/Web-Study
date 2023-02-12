import { App } from "vue";
import { formatDate } from "./formatTime";

/** 自定义全局属性  shims.d.ts 声明类型*/
export default function registerProperties(app: App) {
  app.config.globalProperties.$formatDate = (date: Date, format: string): string => {
    return formatDate(date, format);
  };
  app.config.globalProperties.$show = (flag: boolean): boolean => {
    return flag;
  };
  app.config.globalProperties.$show22 = (flag: boolean): boolean => {
    return flag;
  };
}
