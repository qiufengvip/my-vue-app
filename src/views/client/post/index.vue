<template>
  <el-container class="body">
    <el-header class="header">
      <!--        顶部导航  -->
      <MenuBoard></MenuBoard>
    </el-header>
    <el-main>
      <!--        主体-->
      <div class="body">
        <div class="main">
          <div class="left">
            <div class="left-main">
              <!--  展示 -->
              <div class="article-top">
                <div class="post-title">SpringCloud微服务框架入门与简单使用</div>
                <div class="label selected">
                  <div class="label-item">
                    <SvgIcon name="label"></SvgIcon>
                    <div>SpringCloud</div>
                  </div>
                  <div class="label-item">
                    <SvgIcon name="label"></SvgIcon>
                    <div>微服务框架</div>
                  </div>
                  <div class="label-item">
                    <div>
                      <SvgIcon name="label"></SvgIcon>
                    </div>
                    <div>微服务介绍</div>
                  </div>
                </div>
                <div class="property-s selected">
                  <div class="property">
                    <div>
                      <SvgIcon name="label"></SvgIcon>
                    </div>
                    <div>项目介绍</div>
                  </div>
                  <div class="property">
                    <SvgIcon name="word_count"></SvgIcon>
                    <div>字数: 1.5k</div>
                  </div>
                  <div class="property">
                    <SvgIcon name="sand_clock"></SvgIcon>
                    <div>阅读时长: 4分钟</div>
                  </div>
                  <div class="property selected">
                    <SvgIcon name="feather"></SvgIcon>
                    <div>2020-06-30 12:00:00</div>
                  </div>
                  <div class="property">
                    <SvgIcon name="cyclic_utilization"></SvgIcon>
                    <div>2022-05-08 15:10:24</div>
                  </div>
                </div>
                <div class="middle-t">
                  <div class="comment-main-reply">
                    <div class="t-left"><img src="http://file.luanshiliunian.cn/11111_1637034086344.jpg" alt="a" /></div>
                    <div class="t-right">
                      <div class="right-top-main">
                        <div class="right-top">
                          <div class="right-top-name">秋枫</div>
                          <div class="right-top-id">
                            <SvgIcon name="vip"></SvgIcon>
                            <div class="right-top-grade">普通会员</div>
                          </div>
                        </div>
                      </div>
                      <div class="right-info">
                        <div class="right-info-time">让世界变得更美好</div>
                      </div>
                    </div>
                  </div>
                  <div class="property-s selected middle-p">
                    <div class="p-item">
                      <SvgIcon name="book"></SvgIcon>
                      <div>469788</div>
                    </div>
                    <div class="p-item">
                      <SvgIcon name="comment"></SvgIcon>
                      <div>25</div>
                    </div>
                    <div class="p-item">
                      <SvgIcon name="like"></SvgIcon>
                      <div>80</div>
                    </div>
                  </div>
                </div>
              </div>
              <v-md-editor :model-value="text" mode="preview" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
            </div>
            <!--        评论 -->
            <div class="comment">
              <Comment></Comment>
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
      <!--        底部 版权数据 -->
      <!--        bottom-->
      <Copyright></Copyright>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import MenuBoard from '@/components/blog/MenuBoard.vue';
import Copyright from '@/components/blog/Copyright.vue';
import HotPost from '@/components/blog/HotPost.vue';
import HotComments from '@/components/blog/HotComments.vue';
import Comment from '@/components/blog/Comment.vue';
import SvgIcon from '@/components/common/SvgIcon/index.vue';
import { ref } from 'vue';

const img = ref('http://file.luanshiliunian.cn/11111_1637034086344.jpg');
const title = ref('');
const content = ref('夜深了，世界安静了，风不再呼喊，树也不再摇曳，更像是睡着了。是否你也和树做了一个同样的梦，向往着星辰大海，向往着盛世繁华。');
const date = ref('2021-11-26');
const look = ref(51);
const comment = ref(85);
const text = ref(`
## 全点反算-开始推演
> url
\`\`\`
/priDeduce/startAllPointDeduce
\`\`\`
> params-第一种情况
- 所选指标是   年缴保费、基本保险金额
\`\`\`json
{
  "id": 296,
  "priProductPricing": 1398,
  "baseDefinition": "",   //责任保持原有
  "baseAssum": "",//假设保持原有
  "baseIndex":  "",// 保持原有
  "result": null,// 保持原有
  "createUser": 1,// 保持原有
  "createDate": "2022-09-13",// 保持原有
  "isValid": 1,// 保持原有
  "modelFilepath": "",// 保持原有
  "productId": 1062, // 保持原有
  "rawBaseDefinition": "",// 保持原有
  "type": 1, // 保持原有

  // 如果 计算的指标是保险金额 就是"从产品选择"  弹窗 选择的指标  则传输次参数
  "singlePointList": "",
  // 如果 计算的指标是保险金额 就是"从产品选择"  弹窗 选择的指标  则传输次参数  如果当前选择的指标是 保险金额则传 "basicInsurance"  指标=年交保费 则传输 "yearPremium"
  "contrastProperty": "basicInsurance"
}
\`\`\`

> params-第二种情况
- 所选指标是   年缴保费、基本保险金额 除外的其他指标
\`\`\`json
{
  "id": 296,
  "priProductPricing": 1398,
  "baseDefinition": "",   //责任保持原有
  "baseAssum": "",//假设保持原有
  "baseIndex":  "",// 保持原有
  "result": null,// 保持原有
  "createUser": 1,// 保持原有
  "createDate": "2022-09-13",// 保持原有
  "isValid": 1,// 保持原有
  "modelFilepath": "",// 保持原有
  "productId": 1062, // 保持原有
  "rawBaseDefinition": "",// 保持原有
  "type": 1, // 保持原有
  "singlePointSetting": {   // 本参数需要吧json对象 转为字符串  下面为方便展示写出
    "age": [40, 39,38,37,36,35,34,33,32,31,30], //年龄
    "sex": [ "男性","女性"], // 性别
    "bTerm": [ "保至终身","保至88"], //保险期间
    "pTerm": [10, 9, 7, 6, 5], // 交费期间
    "basicInsurance": [ 500000.0, 300000.0], //基本保险金额  此字段为计算型字段 需要删除本字段留空  基本保险金额和年交保费这两个key只能存在一个
    "yearPremium": [ 5000, 4000], //年交保费 如果此字段为计算型字段 需要删除本字段留空
  }


}
\`\`\`



`);

const handleCopyCodeSuccess = (data: string) => {
  console.log(data);
};
</script>

<style scoped lang="scss">
.header {
  background-color: var(--bg-brand-color);
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
}

.body {
  background-color: var(--bg-brand-color);
}

.main {
  margin-top: 20px;
}

.el-header {
  padding: 0 !important;
}

.el-main {
  padding: 0 !important;
}
</style>

<style lang="scss">
.label {
  display: flex;
  flex-wrap: wrap;

  .label-item {
    background: var(--bg-brand-color)-menu;
    padding: 4px 5px;
    margin-top: 10px;
    border-radius: 3px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 10px;
    font-weight: bold;

    svg {
      width: 12px;
      height: 12px;
      fill: #fff;
    }
  }

  //.label-item:nth-child(n) {
  //    background: @second-color;
  //}
  //
  //.label-item:nth-child(2n) {
  //    background: @angle-color;
  //}
  //
  //.label-item:nth-child(3n) {
  //    background: @high-color;
  //}

  .label-item:nth-child(4n) {
    background: var(--warning-color);
  }

  .label-item:nth-child(5n) {
    background: var(--bg-brand-color);
  }
}

.middle-t {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .p-item {
    color: var(--text-color) 2;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 5px 5px 5px 5px;

    background: var(--border-color);
    margin-right: 20px;
    min-width: 60px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    div {
      padding-left: 5px;
    }
  }
}

.comment-main-reply {
  display: flex;
  padding: 20px 0;

  .t-left img {
    width: 3.001rem;
    height: 3.001rem;
    border-radius: 150%;
  }

  .right-top-main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right-top {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .right-top-name {
      padding-right: 10px;
      font-weight: bold;
      font-size: 1.18rem;
      color: var(--text-color);
    }

    .right-top-id {
      display: flex;
      align-items: center;
      background-color: #d29073;
      border-radius: 5px;
      padding: 1px 5px;

      .right-top-grade {
        font-size: 10px;
        color: #fff5d0;
      }
    }

    .right-top-tag {
      width: 15px;
      height: 15px;
    }
  }

  .right-info-time {
    color: var(--text-color) 2;
  }

  .t-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.8rem;
  }
}

.article-top {
  background: var(--el-bg-color);
  margin-bottom: 2px;
  padding: 30px 20px 30px 30px;
  border-radius: 8px 8px 0 0;

  .post-title {
    font-size: 1.5rem;
    line-height: 150%;
    font-weight: bolder;
    color: var(--text-color);
  }

  .property-s {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .property {
      color: var(--text-color) 2;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      margin-right: 5px;
      //min-width: 130px;
      align-items: center;
      padding: 10px 10px 10px 0;
    }
  }
}

.vuepress-markdown-body {
  color: var(--text-color) !important;
  background-color: var(--el-bg-color) !important;
}
</style>

<style lang="scss" scoped>
.body {
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--bg-brand-color);
}

.v-md-editor {
  background-color: #00000000 !important;
}

.vuepress-markdown-body {
  background-color: #00000000 !important;
  border-radius: 5px !important;
}

.main {
  //width: 1300px;
  display: flex;
}

.left {
  margin: 10px;
  width: 900px;
}

.right {
  width: 400px;
}

.right-main {
  padding: 10px;
}

.left-main {
  //padding: 10px;
}

.comment {
  padding-top: 2px;
}

.icon3 {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 1400px) {
  .left {
    width: auto;
  }

  .right {
    width: 100%;
    /*display: none;*/
  }

  .main {
    flex-direction: column;
  }
}

@media screen and (max-width: 800px) {
  .middle-t {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .middle-p {
    display: flex;
    align-items: flex-end;
  }
}
</style>
