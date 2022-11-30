<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      {{ '顶部' }}
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
      >
        {{ tag.title }}
        <el-icon v-if="!tag.meta.isDefault" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import ScrollPane from './ScrollPane.vue';
import tagsView from './tagsView.js';
import { Close } from '@element-plus/icons';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  store: {
    type: Object,
    default: () => {},
  },
});

// vuex router 处理
props.store.registerModule(['tagsView'], tagsView);
let router = useRouter();
const menuList = computed(() => {
  return props.store.state.menuList;
});
const $route: any = computed(() => {
  return useRoute();
});

// 默认和访问过的页面
const defaultTags: any = ref([]);
const visitedViews = computed(() => {
  return props.store.state.tagsView.visitedViews;
});

const routes = router.options.routes;

// 从路由中找到默认页面
function getDefaultTags(routes: any, basePath = '') {
  let tags: any = [];
  routes.forEach((route: any) => {
    if (route.meta && route.meta.isDefault) {
      const tagPath = basePath + route.path;
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
        tagName: route.meta.tagName,
      });
    }
    if (route.children) {
      const tempTags = getDefaultTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
}

function initTags() {
  defaultTags.value = getDefaultTags(routes);
  // console.log(defaultTags.value);
  for (const tag of defaultTags.value) {
    props.store.dispatch('tagsView/addView', tag);
  }
}

function addTags() {
  let tagName = getTagName(menuList.value, $route.value.path);
  if (tagName) {
    $route.value.tagName = tagName;
  } else {
    $route.value.tagName = $route.value.query.tagName;
  }
  props.store.dispatch('tagsView/addView', $route.value);
  return false;
}

function getTagName(routes: any, path: any): any {
  let tagName: any;
  for (let i = 0; i < routes.length; i++) {
    const v = routes[i];
    if (v.serverUrl === path) {
      tagName = v.serverName;
    }
    if (v.children && v.children.length) {
      tagName = getTagName(v.children, path);
    }
    if (tagName) {
      return tagName;
    }
  }
}

// 当前组件实例,用于处理ref
const that: any = getCurrentInstance();
const scrollPane = ref();

function moveToCurrentTag() {
  const tags: any = that.refs.tag;
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === $route.value.path) {
        scrollPane.value.moveToTarget && scrollPane.value.moveToTarget(tag);
        if (tag.to.fullPath !== $route.value.fullPath) {
          props.store.dispatch('tagsView/updateVisitedView', $route.value);
        }
        break;
      }
    }
  });
}

function closeSelectedTag(view: any) {
  props.store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
}

function closeOthersTags() {
  props.store.dispatch('tagsView/delOthersViews', $route.value).then(() => {
    moveToCurrentTag();
  });
}

function closeAllTags() {
  const view = $route.value;
  props.store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (defaultTags.value.some((tag) => tag.path === view.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
}

function toLastView(visitedViews: any, view: any) {
  //// console.log(visitedViews);
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    // console.log(1212);
    router.push(latestView.fullPath);
  } else {
    router.push('/');
  }
}

function isActive(route: any) {
  return route.path === $route.value.path;
}

onMounted(() => {
  initTags();
  addTags();
});
watch(
  () => $route.value.path,
  (newValue, oldValue) => {
    addTags();
    moveToCurrentTag();
  }
);
defineExpose({
  closeOthersTags,
  closeAllTags,
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  :deep(.el-scrollbar__view) {
    height: 34px;
    line-height: 32px;
  }

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      // border: 1px solid #d8dce5;
      color: #495060;
      background: #f3f3f3;
      padding: 0 8px;
      text-decoration: none;
      font-size: 12px;
      margin-left: 5px;
      // margin-top: 4px;
      border-radius: 2px;

      &:first-of-type {
        margin-left: 0px;
      }

      &:last-of-type {
        margin-right: 10px;
      }

      &.active {
        background-color: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);
      }
    }

    :deep(.el-icon) {
      position: relative;
      top: 2px;
    }
  }
}
</style>
