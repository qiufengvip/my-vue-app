<template>
  <el-container class="common-layout-main">
    <el-container>
      <el-aside class="aside">
        <div class="top-title">
          <img class="icon-logo" :src="imgLogo" alt="logo" />
          <div v-if="!isCollapse">秋枫博客</div>
        </div>
        <el-menu :collapse="isCollapse" class="el-menu-vertical selected" default-active="2" @select="menuSelect">
          <template v-for="item in menuData">
            <template v-if="item.subMenu">
              <template v-if="item.subMenu.length > 0">
                <el-sub-menu :index="item.id" class="menu-item">
                  <template #title>
                    <el-icon class="el-icon" v-html="item.resourceData"></el-icon>
                    <span v-text="item.resourceName"></span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="itemas in item.subMenu">
                      <el-menu-item :index="itemas.id">
                        <el-icon class="el-icon" v-html="itemas.resourceData"></el-icon>
                        <span v-text="itemas.resourceName"></span>
                      </el-menu-item>
                    </template>
                  </el-menu-item-group>
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item :index="item.id">
                  <el-icon class="el-icon" v-html="item.resourceData"></el-icon>
                  <span v-text="item.resourceName"></span>
                </el-menu-item>
              </template>
            </template>
            <template v-else>
              <el-menu-item :index="item.id">
                <el-icon class="el-icon" v-html="item.resourceData"></el-icon>
                <span v-text="item.resourceName"></span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-header class="header">
          <div class="head-t" @click="Collapses">
            <img class="el-icon-menu" :src="imgMenu" alt="menu" />
          </div>
          <div class="head-f">
            <img class="el-icon-menu exit" :src="imgExit" alt="exit" @click="exit()" />
          </div>
        </el-header>
        <DLTagsView :store="store"></DLTagsView>
        <div class="tab-main">
          <router-view v-slot="{ Component }" class="main-content">
            <keep-alive>
              <component :is="Component" :key="$route.fullPath" />
            </keep-alive>
          </router-view>
          <!--          <el-tabs ref="tabsEntity" v-model="editableTabsValue" type="card" class="tabs" closable @tab-remove="removeTab">-->
          <!--            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" style="height: 100%"> </el-tab-pane>-->
          <!--          </el-tabs>-->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import imgExit from '@/assets/svg/exit.svg';
import imgMenu from '@/assets/svg/menu.svg';
import imgLogo from '@/assets/svg/logo.svg';
import DLTagsView from '@/components/common/DLTagsView/index.vue';
import store from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { queryRuleResource } from '@/http/interface/api';
import { toTree } from '@/utils/dataDispose';

store.commit('setMenuList'); //设置菜单
// home, //首页
// userList, //用户列表
// userEdit, //用户修改
// userTest, //
// authorityList, //角色分配资源
// resourceList, //资源管理
// roleList, //角色管理
// hello,
// constantList, //数据字典
// postList, //文章列表
// postAdd, //添加文章
// postEdit, // 编辑文章
// siteConfig, //站点配置
// labelList, // 标签管理
let router = useRouter();
const editableTabs = ref([
  {
    content: 'labelList',
    name: 'a769333502464d968ff6705bfc9fc4a4',
    title: '首页',
  },
]);
const editableTabsValue = ref('a769333502464d968ff6705bfc9fc4a4');
const isCollapse = ref(false);
const whichToShow = ref('');
const menuData = ref<any>([]);
const menuDataOriginal = ref([]); //非树形图的menuData
const apps = ref([]);
const tabs = ref();

onMounted(() => {
  // router.push({ path: '/admin/authority' });
  init();
});
const init = async () => {
  // queryRuleResource({ resourceType: 2 }).then((data) => {
  //   console.log(data);
  //   menuDataOriginal.value = data;
  //   menuData.value = toTree(data, '522296bc9cd044de80df33f386575672', null, 'subMenu');
  // });
  let promise = await queryRuleResource({ resourceType: 2 });
  console.log(promise);
  menuDataOriginal.value = promise;
  menuData.value = toTree(promise, '522296bc9cd044de80df33f386575672', null, 'subMenu');
};

const Collapses = () => {
  isCollapse.value = !isCollapse.value;
};
//
// 菜单点击事件
const menuSelect = (index: any) => {
  console.log(index);
  menuDataOriginal.value.forEach((item: any) => {
    if (item.id === index) {
      addTabs({
        name: item.id,
        title: item.resourceName,
        content: item.resourceValue,
      });
    }
  });
};
// 没有就添加 存在就跳转
const addTabs = (tab: any) => {
  let isAdd = false;
  console.log(tab);
  editableTabs.value.forEach((item: any) => {
    if (item.name === tab.name) {
      isAdd = true;
    }
  });
  if (!isAdd) {
    editableTabs.value.push(tab);
  }
  editableTabsValue.value = tab.name;
};
const exit = () => {
  localStorage.setItem('token', '');
  window.location.href = '/admin';
};
</script>
<style lang="scss">
.el-sub-menu__title {
  color: var(--text-color) !important;
}

.el-sub-menu__title:hover,
.el-menu-item:hover {
  background-color: var(--border-color) !important;
}

.el-menu {
  background-color: var(--bg-brand-color) -menu !important;
}

.el-menu-item.is-active {
  background-color: var(--border-color);
}

.el-menu-item {
  color: var(--text-color) !important;
}

.el-aside {
  --el-aside-width: auto;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 1px solid var(--border-color);
}

.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid var(--border-color);
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: var(--border-color);
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: 1px solid var(--border-color);
}

.el-tabs__item {
  color: var(--text-color);
  background-color: #00000000;
}

.el-tabs__item.is-active {
  color: var(--text-color);
  background-color: var(--border-color);
}

.el-tabs__item:hover {
  color: var(--text-color);
}

.el-tabs__content {
  flex-grow: 1;
}
</style>
<style lang="scss">
.el-card {
  //分割线
  --el-card-border-color: var(--border-color);
  //背景
  --el-card-bg-color: var(--el-bg-color);
}

.el-card {
  color: var(--text-color);
}

.el-table {
  --el-table-border-color: var(--border-color);
  --el-table-border: 1px solid var(--el-table-border-color);
  --el-table-text-color: var(--text-color);
  --el-table-header-text-color: var(--text-color);
  --el-table-row-hover-bg-color: var(--border-color);
  --el-table-current-row-bg-color: var(--border-color);
  --el-table-header-bg-color: var(--bg-brand-color);
  --el-table-fixed-box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  --el-table-bg-color: var(--el-bg-color);
  --el-table-tr-bg-color: var(--el-bg-color);
  --el-table-expanded-cell-bg-color: var(--el-bg-color);
}

:root {
  --el-bg-color: var(--border-color);
  --el-color-white: @font-color;
  --el-color-info: @font-color;
  --el-border-base: var(--el-border-width-base) var(--el-border-style-base) var(--border-color);
  --el-border-color-light: var(--border-color);
  --el-text-color-regular: @font-color;
}

.el-popper.is-light .el-popper__arrow::before {
  background: var(--border-color);
}

.el-input-group__prepend {
  border: 1px solid var(--border-color);
}

.el-input {
  --el-input-text-color: @font-color;
  --el-input-bg-color: var(--el-bg-color);
}

.el-scrollbar {
  background: var(--bg-brand-color);
}
</style>

<style lang="scss" scoped>
.el-icon-menu {
  width: 35px;
  height: 35px;
  color: var(--text-color);
}

.icon-logo {
  width: 30px;
  height: 30px;
  padding: 10px;
}

.icon-logo svg {
  width: 30px;
  height: 30px;
  fill: var(--warning-color);
}

.el-main {
  padding: 0 !important;
  padding-top: 0 !important;
  background-color: var(--bg-brand-color);
}

.el-menu-vertical {
  background-color: var(--bg-brand-color);
  height: auto;
  border-right: solid 1px var(--border-color);
  color: var(--text-color);
  flex-grow: 1;
}

.aside {
  height: 100%;
  background-color: var(--bg-brand-color);
  display: flex;
  flex-direction: column;
}

.common-layout-main {
  width: 100vm;
  height: 100vh;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.header {
  width: 100%;
  background-color: var(--bg-brand-color) -menu;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-menu {
  height: auto;
}

.top-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: var(--el-bg-color);
  color: var(--text-color);
  display: flex;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  align-items: center;
}

.head-f {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon {
  height: auto;
  width: auto;
}

.tab-main {
  background-color: var(--el-bg-color);
  padding: 10px;
  flex-grow: 1;
}

.el-main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.exit {
  cursor: pointer;
}
</style>
