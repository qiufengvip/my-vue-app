<template>
  <!--    站点头部 -->
  <transition name="el-zoom-in-top">
    <div v-show="show" class="qsub-header">
      <div id="qsub-header" ref="transitionBox" class="qsub-header-body">
        <div class="qsub-logo selected">
          <SvgIcon name="logo" color="#00ff00"></SvgIcon>
          <div>秋枫博客</div>
        </div>
        <!-- 移动端 -->
        <div class="qsub-menu-mobile selected">
          <ul class="qsub-menu">
            <li class="qsub-menu-li">
              <div class="qsub-menu-item-f" @click="menuMobile = true">
                <img :src="menu_colours" alt="菜单" />
              </div>
            </li>
          </ul>
        </div>

        <!--       网页版菜单   -->
        <div class="qsub-menu-web selected">
          <ul class="qsub-menu">
            <li v-for="(item, index) in menuData" :key="index" class="qsub-menu-li">
              <div class="qsub-menu-item-f" @mouseenter="menuHover(item)" @mouseleave="menuHover(item)">
                <div v-html="item.resourceData"></div>
                <span class="qsub-menu-title" v-text="item.resourceName"></span>
                <div v-if="item.sub.length > 0" v-html="arrowXia"></div>
                <transition name="el-zoom-in-top">
                  <div v-if="item.sub.length > 0" v-show="item.show" class="qsub-menu-list">
                    <div v-for="(item2, index2) in item.sub" :key="index2" class="qsub-menu-item">
                      <div class="qsub-menu-item-a">
                        <div v-html="item2.resourceData"></div>
                        <span class="qsub-menu-title" v-text="item2.resourceName"></span>
                      </div>
                      <div class="qsub-menu-item-b">
                        <div v-html="arrowYou"></div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>

  <el-drawer v-model="menuMobile" :direction="direction" :with-header="false" size="500">
    <div class="mobile-top selected">
      <el-avatar :size="100" :src="userImg" />
      <div class="user-name">Hi! 欢迎登录</div>
    </div>

    <div class="menu-mobile selected">
      <ul>
        <li v-for="(item, index) in menuData" :key="index" class="menu-mobile-li">
          <div class="menu-mobile-item" @click="menuMobileClick(item)">
            <div class="menu-mobile-item-title">
              <div v-html="item.resourceData"></div>
              <span class="menu-mobile-title" v-text="item.resourceName"></span>
            </div>
            <div v-if="item.sub.length > 0" v-html="arrowXia"></div>
          </div>
          <div v-if="item.sub.length > 0" :style="item.mobileShow ? 'height:' + item.sub.length * 45 + 'px' : 'height:0'" class="menu-mobile-list">
            <div v-for="(item2, subIndex) in item.sub" :key="subIndex" class="menu-mobile-item">
              <div class="menu-mobile-item-a">
                <div v-html="item2.resourceData"></div>
                <span class="menu-mobile-title" v-text="item2.resourceName"></span>
              </div>
              <div class="menu-mobile-item-b">
                <div v-html="arrowYou"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { toTree } from '@/utils/dataDispose';
import menu_colours from '@/assets/svg/menu_colours.svg';
import { getIndexInfo } from '@/http/interface/api';

const userImg = ref('http://file.qsub.cn/userimg.png');
const show = ref(false);
const activeIndex = ref('');
const oldScrollTop = ref(0); // 滚动前，滚动条距顶部的距离
const search = ref(false);
const arrowXia = ref(
  '<svg t="1648789213060" class="icon-arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1875"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="1876"></path></svg>'
);
const arrowYou = ref(
  '<svg t="1648789338480" class="icon-arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2017"><path d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z" p-id="2018"></path></svg>'
);
const menuData = ref<any[]>();
const menuMobile = ref(false);
const transitionBox = ref();

const handleSelect = (key: any, keyPath: any) => {
  console.log(key, keyPath);
  key = [];
  key.push();
  console.log();
};

onMounted(() => {
  // 监听页面滚动事件
  show.value = true;
  window.addEventListener('scroll', scrolling);
  getIndexInfo().then((res: any) => {
    menuData.value = toTree(res.menu, '0b23919cb72a40afb15d9f2d533ed48b', null, 'sub');
  });
});

const menuMobileClick = (item: any) => {
  item.mobileShow = !item.mobileShow;
};
const menuHover = (item: any) => {
  item.show = !item.show;
};
const scrolling = () => {
  // 滚动条距文档顶部的距离
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  let attribute;
  try {
    attribute = transitionBox.value.getAttribute('id');
  } catch (e) {}
  if (scrollTop > 30) {
    if (attribute === 'qsub-header') {
      transitionBox.value.setAttribute('id', 'qsub-header-bg');
    }
  } else {
    if (attribute === 'qsub-header-bg') {
      transitionBox.value.setAttribute('id', 'qsub-header');
    }
  }
  // 滚动条滚动的距离
  let scrollStep = scrollTop - oldScrollTop.value;
  // 更新——滚动前，滚动条距文档顶部的距离
  oldScrollTop.value = scrollTop;
  if (scrollStep < 0) {
    if (!show.value) {
      show.value = true;
    }
  } else {
    if (show.value) {
      show.value = false;
    }
  }
  return true;
};
</script>

<style lang="scss">
/** 图标 **/
.icon {
  fill: var(--text-color);
  width: 16px;
  height: 16px;
  padding-right: 5px;
}

.icon-arrow {
  fill: var(--text-color);
  width: 10px;
  height: 10px;
  padding: 6px;
}
</style>

<style lang="scss" scoped>
.menu-mobile-list {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //display: none;
  height: 0;
  transition: height 0.3s;
  margin-left: 20px;
}

.menu-mobile-list-up {
}

.menu-mobile-item-title {
  display: flex;
  align-items: center;
}

.menu-mobile-item-a {
  display: flex;
  align-items: center;
}

.menu-mobile-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  height: 25px;
  padding: 10px 10px;
}

.menu-mobile-li {
  color: var(--text-color);

  margin: 10px 0;

  font-size: 15px;
  font-weight: bold;
}

.menu-mobile-item:hover {
  background: var(--border-color);
}

.menu-mobile-title {
  margin-left: 10px;
}

.menu-mobile {
  width: 180px;
}

.mobile-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-name {
  margin: 20px 0;
  color: var(--text-color);
  font-size: 16px;
  font-weight: bold;
}

#qsub-header-bg {
  background-color: var(--bg-brand-color) -menu;
}

.qsub-menu-list {
  background-color: var(--bg-brand-color) -menu;
  width: 150px;
  padding: 8px 6px;
  border-radius: 5px;
  position: absolute;
  top: 60px;
  left: -10px;
  opacity: 0.9;
}

.qsub-menu {
}

.qsub-menu-web > .qsub-menu {
  /*height: 10px;*/
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.qsub-menu-li {
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 5px;
  padding: 0 10px;
}

.qsub-menu-li:hover {
  //background: var(--border-color);

  //.qsub-menu-list {
  //    display: block;
  //    height:500px;
  //}
}

.qsub-menu-item-f:hover {
  opacity: 0.8;
}

.qsub-menu-item-f {
  color: var(--text-color);
  display: flex;
  align-items: center;
  position: relative;
}

.qsub-menu-item {
  color: var(--text-color);
  display: flex;
  align-items: center;
  padding: 8px 14px;
  position: relative;
  justify-content: space-between;
}

.qsub-menu-item-a {
  display: flex;
  align-items: center;
}

.qsub-menu-item-b {
}

.qsub-menu-item:hover {
  background: var(--border-color);
  border-radius: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.qsub-header {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 800;
}

.qsub-header-body {
  transition: background-color 1s;
  background-color: var(--bg-brand-color) -menu-immerse;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qsub-logo {
  width: 120px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  padding-right: 20px;
}

.qsub-menu-title {
  color: var(--text-color);
  font-weight: bold;
  font-size: 14px;
}

.qsub-menu-mobile > .qsub-menu {
  width: 100%;
}

.qsub-menu-web {
  display: flex;
  align-items: center;
  height: 100%;
}

.qsub-menu-mobile {
  display: none;
}

@media screen and (max-width: 1000px) {
  .qsub-menu-web {
    display: none;
  }

  .qsub-menu-mobile {
    display: block;
  }

  .qsub-menu-mobile > .qsub-menu {
    width: 100%;
  }
}

.qsub-logo svg {
  width: 30px !important;
  height: 30px;
  padding-right: 10px;
  fill: var(--warning-color);
}

.icons {
  width: 35px;
  height: 35px;
}
</style>
