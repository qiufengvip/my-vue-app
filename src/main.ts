import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index';
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/common/SvgIcon/index.vue';
// 语言
// MD编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
// MD编辑器基础样式
import '@kangc/v-md-editor/lib/style/base-editor.css';
// MD编辑器 代码框显示行号拓展库
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// MD编辑器 代码框快捷复制拓展库
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// MD编辑器 代码框快捷复制拓展库 样式
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// MD编辑器 vuepress 主题 解析器
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// MD编辑器 vuepress 主题 样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// MD编辑器 github 主题 解析器
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// MD编辑器 github 主题 样式
// import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createLineNumbertPlugin());

const app = createApp(App);
app.use(VueMarkdownEditor);
app.use(ElementPlus);
app.use(router);
// 将SvgIcon.vue组件注册为全局组件
app.component('SvgIcon', SvgIcon);
app.mount('#app');
