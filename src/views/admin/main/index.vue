<template>
  <el-container class="common-layout-main">
    <el-container>
      <el-aside class="aside">
        <div class="top-title">
          <SvgIcon color="#E87955" name="logo"></SvgIcon>
          <div v-if="!isCollapse">秋枫博客</div>
        </div>
        <el-menu :collapse="isCollapse" class="el-menu-vertical selected" default-active="2" @select="menuSelect">
          <template v-for="item in menuData">
            <template v-if="item.children">
              <el-sub-menu :index="item.serverUrl" class="menu-item">
                <template #title>
                  <SvgIcon :name="item.icon"></SvgIcon>
                  <span class="menu-title" v-text="item.serverName"></span>
                </template>
                <el-menu-item-group>
                  <template v-for="itemChildren in item.children">
                    <el-menu-item :index="itemChildren.serverUrl">
                      <SvgIcon :name="itemChildren.icon"></SvgIcon>
                      <span class="menu-title" v-text="itemChildren.serverName"></span>
                    </el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="item.serverUrl">
                <SvgIcon :name="item.icon"></SvgIcon>
                <span class="menu-title" v-text="item.serverName"></span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-header class="header">
          <div class="head-t" @click="Collapses">
            <SvgIcon class="el-icon-menu" name="menu"></SvgIcon>
          </div>
          <div class="head-f" @click="exit()">
            <SvgIcon class="el-icon-menu exit" name="exit"></SvgIcon>
          </div>
        </el-header>
        <DLTagsView :store="store"></DLTagsView>
        <div class="tab-main">
          <router-view v-slot="{ Component }" class="main-content">
            <keep-alive>
              <component :is="Component" :key="$route.fullPath" />
            </keep-alive>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import DLTagsView from '@/components/common/DLTagsView/index.vue';

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import store from '@/store';

store.commit('setMenuList');
let router = useRouter();

/**
 * @desc 菜单
 */
interface menuData {
  children: menuData[];
  default: boolean;
  icon: string;
  id: string;
  serverName: string;
  serverUrl: string;
}

// 是否展开左侧菜单
const isCollapse = ref(false);
const menuData = ref<menuData[]>([]);

onMounted(() => {
  init();
});
const init = async () => {
  if (!sessionStorage.getItem('token')) {
    await router.push({ path: '/admin/login' });
  }

  menuData.value = sessionStorage['admin-menu'] ? JSON.parse(sessionStorage['admin-menu']) : [];
  console.log(menuData.value);
};

const Collapses = () => {
  isCollapse.value = !isCollapse.value;
};
//
// 菜单点击事件
const menuSelect = (index: any) => {
  if (index) {
    router.push({ path: index });
  }
};
// 没有就添加 存在就跳转
const addTabs = (tab: any) => {};
const exit = () => {
  sessionStorage.setItem('token', '');
  window.location.href = '/admin';
};
</script>
<style lang="scss">
.el-aside {
  --el-aside-width: auto;
}

.el-tabs__content {
  flex-grow: 1;
}
</style>
<style lang="scss" scoped>
.el-icon-menu {
  width: 35px;
  height: 35px;
}

.icon-logo {
  width: 30px;
  height: 30px;
  padding: 10px;
}

.icon-logo svg {
  width: 30px;
  height: 30px;
}

.el-main {
  padding: 0;
}

.el-menu-vertical {
  height: auto;
  border-right: solid 1px var(--border-color);
  flex-grow: 1;
}

.aside {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.common-layout-main {
  width: 100vw;
  height: 100vh;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.header {
  width: 100%;
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
  height: calc(100vh - 94px);
  overflow: auto;
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
.menu-title {
  margin-left: 10px;
}
</style>
