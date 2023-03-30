import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import postcssPresetEnv from "postcss-preset-env";
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_TITLE: env.VITE_APP_TITLE
          }
        }
      }),
      legacy({
        targets: ["defaults", "ie >= 11", "chrome 52"], //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: true,
        polyfills: [
          "es.symbol",
          "es.array.filter",
          "es.promise",
          "es.promise.finally",
          "es/map",
          "es/set",
          "es.array.for-each",
          "es.object.define-properties",
          "es.object.define-property",
          "es.object.get-own-property-descriptor",
          "es.object.get-own-property-descriptors",
          "es.object.keys",
          "es.object.to-string",
          "web.dom-collections.for-each",
          "esnext.global-this",
          "esnext.string.match-all"
        ]
      })
    ],
    css: {
      postcss: {
        plugins: [postcssPresetEnv()]
      }
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: (env.VITE_DROP_CONSOLE as unknown as boolean) ? ["console.log", "debugger"] : []
    },
    build: {
      target: "es2015",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE as unknown as boolean,
          drop_debugger: true
        }
      },
      outDir: resolve(__dirname, "dist"),
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
