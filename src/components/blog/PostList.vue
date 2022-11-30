<template>
  <div class="el-zoom-in-top">
    <div v-for="item in listData" class="list-main">
      <div class="list-vessel">
        <div v-if="item.img" class="list-left selected">
          <div :style="'background: url(' + item.img + ') center center no-repeat;'" class="img"></div>
          <!--                    <img :src="item.img"  :alt="item.title" ondragstart="return false">-->
        </div>
        <div class="list-right">
          <div class="list-top">
            <div class="list-title">{{ item.title }}</div>
            <div class="list-content">{{ item.content }}</div>
          </div>
          <div class="list-belw selected">
            <div class="list-belw-item">
              <el-icon class="qsub-icon">
                <Clock />
              </el-icon>
              {{ item.date }}
            </div>
            <div class="list-belw-item">
              <el-icon class="qsub-icon">
                <View />
              </el-icon>
              {{ item.look }}
            </div>
          </div>
        </div>
      </div>
      <div class="list-vessel-move">
        <div v-if="item.img" class="list-left selected">
          <div :style="'background: url(' + item.img + ') center center no-repeat;'" class="img"></div>
        </div>
        <div class="list-right">
          <div class="list-top">
            <div class="list-title">{{ item.title }}</div>
            <div class="list-belw selected">
              <div class="list-belw-item">
                <el-icon class="qsub-icon">
                  <Clock />
                </el-icon>
                {{ item.date }}
              </div>
              <div class="list-belw-item">
                <el-icon class="qsub-icon">
                  <View />
                </el-icon>
                {{ item.look }}
              </div>
            </div>
            <div v-if="item.content" class="list-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="qsub-data-loading" @click="loadingData()">{{ loading }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Clock, View } from '@element-plus/icons';

const listData = ref([
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
    title: '不在海滩的沙子',
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
    date: '2021-11-26',
    look: 51,
    comment: 85,
  },
  {
    title: '安河桥',
    content: '',
    date: '2021-11-13 21:09:16',
    look: 51,
    comment: 85,
  },
]);
const loading = ref('查看更多 (｡・`ω´･)');
//加载列表数据
const loadingData = () => {
  loading.value = '加载中...';
  listData.value.push({
    img: 'http://file.luanshiliunian.cn/11111_1637034086344.jpg',
    title: '会做梦的树',
    content: '夜深了，世界安静了，风不再呼喊，树也不再摇曳，更像是睡着了。是否你也和树做了一个同样的梦，向往着星辰大海，向往着盛世繁华。',
    date: '2021-11-26',
    look: 51,
    comment: 85,
  });
  loading.value = '查看更多 (｡・`ω´･)';
};
</script>

<style lang="scss" scoped>
.list-main {
  margin: 20px 0;
  width: 100%;
  border-radius: 5px;
  background: var(--el-bg-color);
}

.list-vessel {
  display: flex;
  height: 100%;
  width: 100%;
}

.list-belw {
  display: flex;
  justify-content: space-between;
  border-top: rgba(230, 230, 230, 0.63) solid 1px;
  padding-top: 10px;
  align-items: center;
}

.list-left {
  width: 300px;
  margin: 10px;
  overflow: hidden;
}

.list-right {
  margin: 20px 15px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
}

.img {
  border-radius: 8px;
  background-size: cover !important;
  width: 100%;
  height: 100%;
}

.list-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.list-content {
  color: #6d6d6d;
  font-size: 14px;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

// 子标题
.list-belw-item {
  display: flex;
  align-items: center;
  color: var(--text-color) 2;
  font-weight: bold;
}

.qsub-icon {
  padding-right: 5px;
}

.qsub-data-loading {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 5px;
  background: var(--el-bg-color);
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 50px;
}

.qsub-data-loading:hover {
  color: var(--text-color);
  box-shadow: -2px -2px 2px var(--border-color), 2px 2px 2px var(--border-color);
}

.list-vessel-move {
  display: none;
}

.list-belw-item {
  padding: 0 15px 10px 0;
}

@media screen and (max-width: 800px) {
  .list-vessel {
    display: none;
  }

  .list-vessel-move {
    display: flex;
    flex-direction: column;

    .list-left {
      width: 100%;
      height: 13.806rem;
      margin: 0;

      .img {
        border-radius: 8px 8px 0 0;
      }
    }

    .list-right {
      width: auto;

      .list-belw {
        justify-content: flex-start;
      }
    }
  }
}
</style>
