<template>
  <div class="comment-body">
    <div class="title">5条评论和回复</div>
    <div class="comment-independent">
      <div class="comment-main">
        <div class="left"><img src="http://file.luanshiliunian.cn/11111_1637034086344.jpg" alt="a" /></div>
        <div class="right">
          <div class="right-top-main">
            <div class="right-top">
              <div class="right-top-id">
                <SvgIcon name="vip"></SvgIcon>
                <div class="right-top-grade">普通会员</div>
              </div>
              <div class="right-top-name">秋枫</div>
            </div>
            <div class="reply-to-me">回复</div>
          </div>
          <div class="right-info">
            <div class="right-info-time">2021年12月4日 at 13:33</div>
            <div class="right-info-level">回复：秋枫</div>
          </div>
          <div class="right-content">对 jsjiami.com.v6 加密结果如何进行手工解密</div>
        </div>
      </div>
      <div class="comment-main-reply">
        <div class="left"><img src="http://file.luanshiliunian.cn/11111_1637034086344.jpg" alt="a" /></div>
        <div class="right">
          <div class="right-top-main">
            <div class="right-top">
              <div class="right-top-id">
                <SvgIcon name="vip"></SvgIcon>
                <div class="right-top-grade">普通会员</div>
              </div>
              <div class="right-top-name">秋枫</div>
            </div>
            <div class="reply-to-me">回复</div>
          </div>
          <div class="right-info">
            <div class="right-info-time">2021年12月4日 at 13:33</div>
            <div class="right-info-level">回复：秋枫</div>
          </div>
          <div class="right-content">对 jsjiami.com.v6 加密结果如何进行手工解密</div>
        </div>
      </div>
    </div>

    <div class="comment-independent">
      <div class="comment-main">
        <div class="left"><img src="http://file.luanshiliunian.cn/11111_1637034086344.jpg" alt="a" /></div>
        <div class="right">
          <div class="right-top-main">
            <div class="right-top">
              <div class="right-top-id2">
                <SvgIcon name="svip"></SvgIcon>
                <div class="right-top-grade">超级会员</div>
              </div>
              <div class="right-top-name">秋枫</div>
            </div>
            <div class="reply-to-me">回复</div>
          </div>
          <div class="right-info">
            <div class="right-info-time">2021年12月4日 at 13:33</div>
            <div class="right-info-level">回复：黄恬笑</div>
          </div>
          <div class="right-content">
            黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑黄恬笑
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/common/SvgIcon/index.vue';

const data = ref([
  {
    title: '程序改变世界',
    subhead: '世界以你为荣',
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
  },
  {
    title: '秋枫',
    subhead: '让世界变得更美好！',
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627006927-12df53fea8b3adf.jpg',
  },
]);
</script>

<style lang="scss" scoped>
.comment-body {
  border-radius: 0 0 8px 8px;
  background-color: var(--el-bg-color);
}

.title {
  padding: 20px 30px;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
}

.comment-main {
  display: flex;
}

.comment-main-reply {
  display: flex;
  width: 100%;
}

.comment-main .left {
  //padding-left: 20px;
}

.comment-main-reply .left {
  padding-left: 50px;
}

.left img {
  width: 40px;
  height: 40px;
  border-radius: 150%;
}

.right {
  padding: 0 0 0 10px;
  width: 100%;
}

.right-top {
  display: flex;
  align-items: center;
}

.right-top-id {
  display: flex;
  align-items: center;
  background-color: #d29073;
  border-radius: 5px;
  padding: 0 5px 0 5px;
}

.right-top-id2 {
  display: flex;
  align-items: center;
  background-color: #dc4700;
  border-radius: 5px;
  padding: 0 5px 0 5px;
}

.right-top-id .right-top-tag {
  width: 20px;
  height: 20px;
}

.right-top-id2 .right-top-tag {
  width: 15px;
  height: 15px;
  padding: 3px;
}

.right-top-grade {
  font-size: 0.6rem;
  font-weight: bold;
  color: #fff5d0;
}

.right-top-name {
  padding-left: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--text-color);
}

.right-top-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-info {
  display: flex;
  font-size: 0.6rem;
  padding: 10px 10px 10px 0;
  color: var(--text-color) 2;
}

.right-info-time {
}

.right-info-level {
  padding-left: 20px;
}
.reply-to-me {
  border-radius: 5px;
  background: var(--warning-color);
  padding: 5px 10px;
  color: #fff;
  font-size: 0.72rem;
}

.right-content {
  padding: 0 10px 20px 0;
  font-size: 0.8rem;
  //line-height: 28px;
  line-height: 165%;
  color: var(--text-color);
}
.comment-independent {
  padding: 0 30px;
}

@media screen and (max-width: 1400px) {
  .comment-independent {
    padding: 0 10px;
  }
}
</style>
