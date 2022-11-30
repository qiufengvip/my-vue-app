import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
// elementplus相关包
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// elementPlus提供的开箱即用的tree shaking功能
// npm i unplugin-vue-components unplugin-element-plus -D
// npm i unplugin-vue-components unplugin-auto-import
// npm install -D unplugin-auto-import
import ElementPlus from 'unplugin-element-plus/vite';
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// npm i --save-dev @types/node 报错安装
// 数据mock配置
import prismjs from 'vite-plugin-prismjs';
import { defineConfig } from 'vite';
// npm i --save-dev @types/node 报错安装
const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 教程来自：https://blog.csdn.net/m0_38134431/article/details/125508459
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 或
      // iconDirs: [pathResolve('./src/assets/svg')],
      // 指定symbolId格式 多级目录使用-分割如: 【home/home.svg】 = 【home-home】
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      // 自动导入vue相关的Api
      imports: ['vue'], // 也支持vue-router、axios等
      // 声明文件的存放位置
      dts: 'src/auto-imports.d.ts',
    }),
    // 自动导入element的组件
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
    ElementPlus(),
    // viteMockServe({
    //   // ↓解析根目录下的mock文件夹
    //   mockPath: 'mock',
    //   localEnabled: command === 'serve',
    //   supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    //   watchFiles: true, // 监视文件更改 更改mock的时候，不需要重新启动编译
    // }),
    prismjs({
      languages: 'all',
    }),
  ],
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1', // 监听的IP地址
    port: 3000, //启动端口
    open: true, // 自动打开
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', ''),
      },
    },
  },
});
