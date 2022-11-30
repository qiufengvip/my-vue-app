<template>
  <div class="qsub-hot">
    <div class="qsub-hot-top">
      <div class="qsub-hot-title">热门评论</div>
    </div>

    <div class="qsub-hot-content">
      <div v-for="item in dataList" class="qsub-hot-post">
        <div class="qsub-hot-content-top">
          <div class="qsub-hot-content-top-tile">
            <img :src="item.img" />
            <div class="qsub-hot-user-name">{{ item.userName }}</div>
          </div>
          <div class="qsub-time">{{ item.date }}</div>
        </div>
        <div class="qsub-hot-content-main">
          <div class="qsub-hot-content-bottom">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dataList = ref([
  {
    img: 'http://file.luanshiliunian.cn/11111_1637034086344.jpg',
    userName: '会做梦的树',
    content: '夜深了，世界安静了，风不再呼喊，树也不再摇曳，更像是睡着了。是否你也和树做了一个同样的梦，向往着星辰大海，向往着盛世繁华。',
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    userName: '无题',
    content: '狂风暴雨天雷惊，厉雨初停天地新。雨后市井皆小秀，手持撑花路边游。',
    date: '2021-11-16 11:36:27',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    userName: '不在海滩的沙子,他被人黏在漂流瓶上扔进海里,没有人知道它最后到了那里,没有人知道它最后到了那里',
    content:
      '不在海滩的沙子\n' +
      '他被人黏在漂流瓶上扔进海里\n' +
      '没有人知道它最后到了那里\n' +
      '也没有人在乎它到了那里\n' +
      '\n' +
      '不在海滩的沙子\n' +
      '它飘落在某处的深海里\n' +
      '路过的鱼不曾与它交流\n' +
      '也不曾记得它\n' +
      '\n' +
      '鱼把他吸进腮中再吐出来\n' +
      '它就这样不说话不计较\n' +
      '任由摆布，任由蹂躏\n' +
      '它不去说也没有人知道\n' +
      '\n' +
      '漂浪在深海的沙子\n' +
      '它看见抹香鲸卷起的巨大水窝\n' +
      '像是能吞噬一切的恶魔\n' +
      '他看见自相残杀的小非鱼\n' +
      '鲜血染红了整个水面染红了它的全身\n' +
      '\n' +
      '漂浪在深海的沙子\n' +
      '是否它也有一丝害怕\n' +
      '是否也有一丝的恐惧\n' +
      '终于它落入了海底\n' +
      '\n' +
      '落在了一棵海草的旁边\n' +
      '不再飘荡不再出现\n' +
      '等待着时间把它腐蚀降解\n' +
      '\n' +
      '不在海滩的沙子\n' +
      '它不在乎，不担心，甚至不会去想\n' +
      '因为 他已经离开了海滩。',
    date: '2021-11-26 11:36:27',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    userName: '安河桥',
    content: '在用node调试js的时候，是否遇到过这样的问题？ 当我第一次遇到这样的问题，我以为...',
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
]);
</script>

<style lang="scss" scoped>
.qsub-hot-top {
  padding: 20px;
}

.qsub-hot-content {
  padding: 0 20px 20px 20px;
}

.qsub-hot-title {
  color: var(--text-color);
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px;
  border-left: #234adb solid 4px;
  margin-left: 2px;
}

.qsub-hot-content-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.qsub-hot {
  margin-top: 10px;
  background: var(--el-bg-color);
  border-radius: 5px;
}

.qsub-hot-post {
  /*display: flex;*/
  margin-bottom: 18px;

  border-radius: 5px;
}

.qsub-hot-content-top img {
  width: 30px;
  height: 30px;
  border-radius: 150%;
}

.qsub-hot-content-top {
}

.qsub-hot-content-top-tile {
  display: flex;
  align-items: center;
}

.qsub-hot-user-name {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  //width: 150px;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: bold;
}

.qsub-time {
  min-width: 110px;
  color: var(--text-color);
}

.qsub-hot-content-bottom {
  background: var(--border-color);
  padding: 8px 8px 5px 8px;
  border-radius: 5px;
  font-size: 0.8rem;
  color: var(--text-color) 2;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

.qsub-hot-content-main {
  margin: 15px 0 10px 0;
  position: relative;
}

.qsub-hot-content-main::before {
  content: ' ';
  border-left: 8px solid transparent;
  border-top: 0 solid var(--border-color);
  border-right: 8px solid transparent;
  border-bottom: 8px solid var(--border-color);
  position: absolute;
  left: 10px;
  top: -8px;
}
</style>
