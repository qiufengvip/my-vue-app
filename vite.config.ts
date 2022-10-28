import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
// elementplus相关包
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// elementPlus提供的开箱即用的tree shaking功能
// npm i unplugin-vue-components unplugin-element-plus -D
// npm i unplugin-vue-components unplugin-auto-import
// npm install -D unplugin-auto-import
import ElementPlus from 'unplugin-element-plus/vite';

// npm i --save-dev @types/node 报错安装
import { resolve } from 'path'; //必须要引入resolve

// 数据mock配置
import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入vue相关的Api
        imports: ["vue"],  // 也支持vue-router、axios等
        // 声明文件的存放位置
        dts: 'src/auto-imports.d.ts',
      }),
      // 自动导入element的组件
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
      ElementPlus(),
      viteMockServe({
        // ↓解析根目录下的mock文件夹
        mockPath: "mock",
        localEnabled: command === "serve",
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改 更改mock的时候，不需要重新启动编译
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@store": resolve(__dirname, "src/store"),
      },
    },
    server: {
      host: "127.0.0.1", // 监听的IP地址
      port: 3000, //启动端口
      open: true, // 自动打开
      proxy: {
        "/dapi": {
          target: "http://120.76.52.66",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dapi/, ""),
        },
      },
    },
  };
};
