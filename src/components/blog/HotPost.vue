<template>
  <div class="qsub-hot">
    <div class="qsub-hot-top">
      <div class="qsub-hot-title">热门帖子</div>
    </div>
    <div class="qsub-hot-content">
      <div v-for="item in dataList" class="qsub-hot-post">
        <div v-if="item.img" class="qsub-hot-left">
          <div class="img" :style="'background: url(' + item.img + ') center center no-repeat;'"></div>
        </div>
        <div class="qsub-hot-right">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dataList = ref([
  {
    img: 'http://file.luanshiliunian.cn/11111_1637034086344.jpg',
    title: '会做梦的树',
    content: '夜深了，世界安静了，风不再呼喊，树也不再摇曳，更像是睡着了。是否你也和树做了一个同样的梦，向往着星辰大海，向往着盛世繁华。',
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    title: '无题',
    content: '狂风暴雨天雷惊，厉雨初停天地新。雨后市井皆小秀，手持撑花路边游。',
    date: '2021-11-16 11:36:27',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    title: '不在海滩的沙子,他被人黏在漂流瓶上扔进海里,没有人知道它最后到了那里,没有人知道它最后到了那里子,他被人黏在漂流瓶上扔进海里,没有人知道它最后到了那里,没有人知道它最后到了那里',
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
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
  {
    img: 'https://media.mybj123.com/wp-content/uploads/2021/07/1627010920-d0c57a75e4fbb30.jpg',
    title: '安河桥',
    content: '在用node调试js的时候，是否遇到过这样的问题？ 当我第一次遇到这样的问题，我以为...',
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
  {
    title: '安河桥',
    content:
      '让我再看你一遍\n' +
      '从南到北\n' +
      '像是被五环路蒙住的双眼\n' +
      '请你再讲一遍\n' +
      '关于那天\n' +
      '抱着盒子的姑娘\n' +
      '和擦汗的男人\n' +
      '我知道 那些夏天\n' +
      '就像青春一样回不来\n' +
      '代替梦想的也只能是勉为其难\n' +
      '\n' +
      '我知道 吹过的牛逼\n' +
      '也会随青春一笑了之\n' +
      '让我困在城市里\n' +
      '纪念你\n' +
      '让我再尝一口\n' +
      '秋天的酒\n' +
      '一直往南方开\n' +
      '不会太久\n' +
      '让我再听一遍\n' +
      '最美的那一句\n' +
      '你回家了\n' +
      '我在等你呢\n' +
      '我知道 那些夏天\n' +
      '就像青春一样回不来\n' +
      '代替梦想的也只能是勉为其难\n' +
      '我知道 吹过的牛逼\n' +
      '也会随青春一笑了之\n' +
      '让我困在城市里 纪念你\n' +
      '我知道 那些夏天\n' +
      '就像你一样回不来\n' +
      '我也不会再对谁满怀期待\n' +
      '我知道 这个世界\n' +
      '每天都有太多遗憾\n' +
      '所以你好 再见',
    date: '2021-11-13 21:09:16',
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
  font-size: 13px;
  font-weight: bold;
  padding: 5px 10px;
  border-left: var(--bg-brand-color) solid 4px;
}

.qsub-hot {
  /*margin: 10px;*/
  background: var(--el-bg-color);
  border-radius: 5px;
}

.qsub-hot-post {
  display: flex;
  padding: 8px;
  border-radius: 8px;
  background: var(--border-color);
  margin-bottom: 10px;
  height: 4.7rem;
}

.qsub-hot-left .img {
  background-size: cover !important;
  width: 120px;
  height: 100%;
  border-radius: 5px;
}

.qsub-hot-right {
  margin: 5px 10px 10px 10px;
  font-size: 0.7rem;
  color: var(--text-color);
  line-height: 130%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}
</style>
