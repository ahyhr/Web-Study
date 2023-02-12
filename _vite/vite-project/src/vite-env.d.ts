/// <reference types="vite/client" />

declare module "element-plus/dist/locale/zh-cn.mjs";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_DROP_CONSOLE: boolean;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
