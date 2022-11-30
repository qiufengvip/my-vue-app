<!--网站底部-->
<template>
  <div class="qsub-bottom selected">
    <div class="qsub-bottom-main">
      <div class="qsub-bottom-top">
        <div>上天给我们生命，一定是为了让我们创造奇迹的。</div>
      </div>
      <div class="qsub-bottom-bot">
        <div class="qsub-bottom-bot-slogan" v-text="slogan"></div>
        <div class="qsub-bottom-bot-copyright" v-text="copyright"></div>
        <div class="qsub-bottom-bot-copyright" v-text="aq"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const slogan = ref('< 吧看不见的东西写在纸上 >');
const aq = ref('冀ICP备17024766号');
const copyright = ref(' COPYRIGHT © 2021 秋枫&乱世流年');
</script>

<style lang="scss" scoped>
.qsub-bottom-main {
  width: 1300px;
}

.qsub-bottom {
  background-color: var(--bg-brand-color)-menu;
  display: flex;
  justify-content: center;
  width: 100%;
}

.qsub-bottom-top {
  height: 150px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  justify-content: center;
  align-items: center;
  display: flex;
}

.qsub-bottom-bot {
  padding-top: 20px;
  border-top: #dfdfdf 1px solid;
  /*height: 100px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qsub-bottom-bot-slogan {
  font-weight: bold;
  font-size: 18px;
  padding: 30px;
  color: var(--text-color) 2;
}

.qsub-bottom-bot-copyright {
  padding: 5px;
  color: var(--text-color) 2;
}
</style>
