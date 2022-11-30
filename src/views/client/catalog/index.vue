<!-- 分类专栏管理 -->
<template>
  <el-container>
    <!--        顶部导航  -->
    <MenuBoard></MenuBoard>
    <el-main>
      <div class="top">
        <div class="top-img" :style="{ background: img }">
          <div>{{ title }}</div>
        </div>
        <div class="top-label">
          <div class="top-label-item">
            <svg t="1643898385324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="200" height="200">
              <path
                d="M788.48 629.418667c0-17.066667-5.802667-31.744-17.749333-44.714667L421.205333 235.861333c-12.288-12.288-29.354667-22.869333-49.834667-31.744-21.162667-8.874667-39.936-12.970667-57.002667-12.970667L110.933333 191.146667c-17.066667 0-31.744 6.485333-44.032 18.773333-12.288 12.288-18.773333 26.965333-18.773333 44.032l0 202.752c0 17.066667 4.096 36.522667 12.970667 57.002667 8.874667 21.162667 18.773333 37.546667 31.744 49.834667l349.525333 349.525333c12.288 12.288 26.965333 17.749333 44.032 17.749333 17.066667 0 31.744-5.802667 44.714667-17.749333l239.616-239.616C781.994667 661.162667 788.48 646.485333 788.48 629.418667L788.48 629.418667 788.48 629.418667zM248.490667 392.192c-12.288 12.288-26.965333 18.090667-44.032 18.090667-17.066667 0-31.744-5.802667-44.032-18.090667-12.288-12.288-18.090667-26.965333-18.090667-44.032 0-17.066667 5.802667-31.744 18.090667-44.032 12.288-12.288 26.965333-18.090667 44.032-18.090667 17.066667 0 31.744 5.802667 44.032 18.090667C260.778667 316.416 266.24 331.093333 266.24 348.16 267.264 365.568 260.778667 379.904 248.490667 392.192L248.490667 392.192 248.490667 392.192zM958.122667 584.362667 608.597333 235.861333c-12.288-12.288-29.354667-22.869333-49.834667-31.744C537.6 195.242667 518.826667 191.146667 501.76 191.146667l-109.909333 0c17.066667 0 36.522667 4.096 57.002667 12.970667 21.162667 8.874667 37.546667 18.773333 49.834667 31.744l349.525333 348.501333c12.288 12.970667 18.090667 27.648 18.090667 44.714667s-5.802667 31.744-18.090667 44.032l-229.034667 229.717333c9.898667 9.898667 18.773333 17.066667 25.941333 21.845333 7.168 4.778667 17.066667 6.485333 28.672 6.485333 17.066667 0 31.744-5.802667 44.714667-18.090667l239.616-240.298667c12.288-12.288 17.749333-26.965333 17.749333-44.032S970.069333 597.674667 958.122667 584.362667L958.122667 584.362667 958.122667 584.362667zM958.122667 584.362667"
                p-id="2062"
                fill="#bfbfbf"
              ></path>
            </svg>
            相关标签
          </div>
          <div v-for="item in label" class="top-label-item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="body">
        <!--        主体-->

        <div class="main">
          <div class="left">
            <div class="left-main">
              <Nav></Nav>
              <PostList></PostList>
            </div>
          </div>
          <div class="right">
            <div class="right-main">
              <HotPost></HotPost>
              <HotComments></HotComments>
            </div>
          </div>
        </div>
      </div>
      <Copyright></Copyright>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import MenuBoard from '@/components/blog/MenuBoard.vue';
import PostList from '@/views/admin/blog/posts/postList.vue';
import HotPost from '@/components/blog/HotPost.vue';
import HotComments from '@/components/blog/HotComments.vue';
import Copyright from '@/components/blog/Copyright.vue';

const img = ref('url(https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg)');
const title = ref('前端');
const label = ref([' 相关标签', '3D相册', '404', '404页面', ':nth-child(n)']);
</script>

<style scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-header {
  padding: 0 !important;
}

.el-main {
  padding: 0 !important;
}

.body {
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(246, 246, 246) !important;
}

.main {
  width: 1300px;
  display: flex;
}

.left {
  width: 900px;
}

.right {
  width: 400px;
}

.right-main {
  padding: 30px 10px 10px 10px;
}

.left-main {
  padding: 10px;
}

@media screen and (max-width: 1400px) {
  .right {
    width: 100%;
  }

  .left {
    width: 100%;
  }

  .main {
    flex-direction: column;
  }
}

.top-img {
  width: 100%;
  height: 15rem;
  line-height: 15vh;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-label svg {
  width: 13px;
  height: 13px;
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgb(246, 246, 246) !important;
}

.top-label {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 1220px;
  margin: 10px 10px 0 10px;
  padding: 15px 30px;
  top: -10px;
  background: #fff;
  border-radius: 5px;
}

.top-label-item {
  padding: 8px;
  font-size: 15px;
  border-radius: 5px;
  margin: 5px;
}

.top-label-item:first-child {
  background: rgb(241 241 241);
}
</style>
