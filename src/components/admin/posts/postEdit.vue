<template>
  <!--    修改文章  -->
  <div class="postAdd">
    <div class="top">
      <el-form :model="form" label-width="120px" style="width: 50%">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" show-word-limit />
        </el-form-item>
        <div class="top">
          <el-form-item label="文章分类">
            <el-cascader :key="subtotalKey" v-model="resourceId" :options="subtotal" placeholder="输入关键字" :props="props1" filterable />
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select v-model="form.state" disabled placeholder="文章状态">
              <el-option v-for="i in postReleaseList" :label="i.label" :value="i.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="form.releases" disabled placeholder="审核状态">
              <el-option v-for="i in postStateList" :label="i.label" :value="i.value" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="简述">
          <el-input v-model="form.subtitle" rows="4" type="textarea" show-word-limit />
        </el-form-item>
      </el-form>

      <div style="padding-left: 60px; width: 45%">
        <div class="qsub-form">
          <div class="qsub-form-item">
            <div class="qsub-form-label">缩略图</div>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="postsImg"
              :auto-upload="true"
              :limit="1"
            >
              <template v-if="form.postsImg">
                <img class="el-upload-list__item-thumbnail avatar" :src="form.postsImg" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePostsImg(form.postsImg, 1)">
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span class="el-upload-list__item-preview" @click="handlePostsImg(form.postsImg, 2)">
                    <el-icon><Download /></el-icon>
                  </span>
                  <span class="el-upload-list__item-preview" @click="handlePostsImg(form.postsImg, 3)">
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </template>

              <template #trigger>
                <template v-if="!form.postsImg">
                  <el-icon class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </template>
              </template>
            </el-upload>
          </div>
          <div>
            <el-button type="primary" @click="staging">查看本文历史数据</el-button>
            <el-button type="primary" @click="staging">查看历史</el-button>
            <el-button type="primary" @click="removePage">清除本页</el-button>
          </div>
        </div>

        <div class="qsub-form">
          <div class="qsub-form-item">
            <div class="qsub-form-label">文章标签</div>
            <div class="labels">
              <el-tag v-for="tag in labels" class="mx-1" closable :disable-transitions="false" :type="getType()" @close="handleClose(tag, 'labels')">
                {{ tag }}
              </el-tag>
              <el-input
                v-if="labelsInputVisible"
                ref="labelsInputRef"
                v-model="labelsInputValue"
                class="tagInput"
                show-word-limit
                size="small"
                @keyup.enter="handleInputConfirm('labelsInputValue', 'labels')"
                @blur="handleInputConfirm('labelsInputValue', 'labels', 'labelsInputVisible')"
              />
              <el-button v-else type="success" class="button-new-tag ml-1" size="small" @click="showInput('labelsInputVisible', 'labelsInputRef')"> + 添加标签 </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="文章内容">
        <v-md-editor v-model="form.content" class="editor" :disabled-menus="[]" height="820px" @save="articleSave" @copy-code-success="handleCopyCodeSuccess" @upload-image="uploadImage"></v-md-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="staging">存草稿</el-button>
        <el-button type="success" @click="submits">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--    图片预览组件-->
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons';
import { nextTick } from 'vue';
import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { API, uploadFile } from '@/http/interface/api';
import { post } from '@/http/http';
import { toTree } from '@/utils/dataDispose';

export default {
  name: 'PostAdd',
  components: {
    Plus,
    ZoomIn,
    Download,
    Delete,
  },
  emits: [
    'addTabs',
    'removeTab', // 移除标签
  ],
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      props1: {
        checkStrictly: true,
      },
      postStateList: [], //文章审核状态
      postReleaseList: [], //文章发布状态
      subtotal: [
        {
          value: '1',
          label: '前端',
          children: [
            {
              value: '2',
              label: 'vue',
            },
          ],
        },
        {
          value: '3',
          label: 'java',
          children: [
            {
              value: '4',
              label: 'spring',
            },
          ],
        },
      ], //分类菜单
      form: {
        id: '', //文章id
        title: '', //文章标题
        postsImg: '', //缩略图
        resourceId: '', //栏目id
        state: 1, //发布状态
        releases: 1, //审核状态
        subtitle: '', //文章副标题
        content: '', //主体内容
        labels: [], //标签
      },
      subtotalKey: -5, //key
      resourceId: [], //栏目id
      labels: [], //标签
      postsImg: [],
      labelsInputVisible: false,
      labelsInputValue: '', //
      searchKeyInputVisible: false,
      searchKeyInputValue: '', //
      model: 1, //默认是一 加载缓存库中最新的数据
      tabsId: 'f8a013b9ae1d4615b047fcf0550e8a71', //本页面的id
      postEdit: true,
      interval: undefined,
    };
  },
  mounted() {
    post(API.selectConstantData, { code: 'postRelease' }).then((res) => {
      if (res.code === 0) {
        this.postReleaseList = res.data;
      }
    });
    post(API.selectConstantData, { code: 'postState' }).then((res) => {
      if (res.code === 0) {
        this.postStateList = res.data;
      }
    });
    // console.log(this.$parent)
    this.readData();
  },
  methods: {
    automatically() {
      console.log('编辑文章-> 关闭自动保存方法');
      if (this.interval) {
        clearInterval(this.interval);
      }
    },

    // 初始调用方法
    readData(postId) {
      const loading = ElLoading.service({
        lock: true,
        text: '正在为您加载...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      postId = this.$parent.name;
      if (this.model === 1) {
        //获取文章分类
        let _this = this;
        post(API.queryRuleResource, { resourceType: 1 }).then((res) => {
          if (res.code === 0) {
            let data = res.data;
            data.forEach((item) => {
              item.label = item.resourceName;
              item.value = item.id;
            });
            this.subtotal = toTree(data, '0b23919cb72a40afb15d9f2d533ed48b', null, 'children');
            console.log(this.subtotal);
            //加载帖子数据
            post(API.postGetCache, { postId: postId }).then((res) => {
              if (res.code === 0) {
                if (res.data) {
                  if (res.data.list) {
                    if (res.data.list.length > 0) {
                      let postData = JSON.parse(res.data.list[0].postJsonData);
                      console.log(postData);
                      if (postData.labels) {
                        this.labels = JSON.parse(postData.labels);
                      }
                      this.getResourceId(postData.resourceId, this.subtotal);
                      console.log('最终结果', this.resourceId);
                      this.subtotalKey = 5;
                      this.form = postData;
                      if (this.form.postsImg) {
                        document.getElementsByClassName('el-upload')[0].style.display = 'none';
                      }
                      console.log(this.form);
                      this.tabsId = this.form.id;
                      //自动缓存
                      loading.close();
                    }
                  }
                }
              }
            });
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
    },
    getResourceId(resourceId, total) {
      let ret = false;
      total.forEach((item) => {
        if (item.id === resourceId) {
          this.resourceId.push(item.id);
          ret = true;
          return true;
        } else {
          //有子集
          if (item.children) {
            if (this.getResourceId(resourceId, item.children)) {
              let list = this.resourceId;
              let list2 = [];
              list2.push(item.id);
              this.resourceId = list2.concat(list);
              return true;
            }
          }
        }
      });
      return ret;
    },
    handleCopyCodeSuccess(code) {
      console.log(code);
    },
    uploadImage(event, insertImage, files) {
      ElNotification({
        title: '上传提示',
        message: '正在快马加鞭，努力上传中...',
        type: 'success',
      });
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);
      let name1 = files[0].name;

      // 此处只做示例
      uploadFile(files[0]).then((res) => {
        if (res.code === 0) {
          insertImage({
            url: res.data,
            desc: name1,
          });
          this.handleAvatarSuccess();
        } else {
          ElMessage.error(res.msg);
        }
      });
    },
    articleSave() {
      console.log('文章保存');
    },
    submits() {
      this.automaticStorage(2); //发布
    },
    getType() {
      let number = parseInt(5 * Math.random());
      switch (number) {
        case 1:
          return '';
        case 2:
          return 'success';
        case 3:
          return 'warning';
        default:
          return 'danger';
      }
    },
    handleClose(tag, type) {
      this[type].splice(this[type].indexOf(tag), 1);
    },
    showInput(a, b) {
      this[a] = true;
      nextTick(() => {
        this.$refs[b].focus();
      });
    },
    //标签添加成功或失败
    handleInputConfirm(type, b, c) {
      console.log('取消', c);
      this[c] = false;
      if (this[type]) {
        this[b].push(this[type]);
      }
      this[type] = '';
    },
    //缩略图上传
    handleAvatarSuccess(response, uploadFile) {
      document.getElementsByClassName('el-upload')[0].style.display = 'none';
      console.log('成功', uploadFile);
    },
    //缩略图格式验证器
    beforeAvatarUpload(rawFile) {
      console.log(rawFile.type.slice(0, 6));
      if (rawFile.type.slice(0, 6) !== 'image/') {
        ElMessage.error('应上传图片');
      } else if (rawFile.size / 1024 / 1024 > 40) {
        ElMessage.error('不能大于 40MB!');
      }
      uploadFile(rawFile).then((res) => {
        if (res.code === 0) {
          this.form.postsImg = res.data;
          this.handleAvatarSuccess();
        } else {
          ElMessage.error(res.msg);
        }
      });

      return false;
    },

    handlePostsImg(fileUrl, index) {
      switch (index) {
        case 1:
          this.dialogVisible = true;
          this.dialogImageUrl = fileUrl;
          break;
        case 2:
          open(fileUrl);
          break;
        case 3:
          this.form.postsImg = '';
          document.getElementsByClassName('el-upload')[0].style.display = 'block';
          break;
      }
      console.log('点击', index);
    },
    //自动缓存
    automaticStorage(state) {
      this.form.resourceId = this.resourceId[this.resourceId.length - 1];
      this.form.labels = JSON.stringify(this.labels);
      let data = JSON.parse(JSON.stringify(this.form));
      data.state = 1;
      if (state) {
        data.state = state;
      }
      post(API.postSetCache, data).then((res) => {
        if (res.code === 0) {
          if (state === 2) {
            ElNotification({
              title: '发布',
              message: '发布成功',
              type: 'success',
            });
            this.$emit('removeTab', this.form.id);
          } else {
            ElNotification({
              title: '远程存储',
              message: res.msg,
              type: 'success',
            });
          }
          if (res.data) {
            this.form.id = res.data;
          }
        } else {
          if (state === 2) {
            ElMessage.error(res.msg);
          } else {
            ElNotification({
              title: '远程存储',
              message: res.msg,
              type: 'error',
            });
          }
        }
      });
    },
    //暂存按钮
    staging() {
      this.automaticStorage(1); //存草稿
    },

    // 初始化
    removePage() {
      this.form = {
        id: '', //文章id
        title: '', //文章标题
        postsImg: '', //缩略图
        resourceId: '', //栏目id
        state: 1, //发布状态
        releases: 1, //审核状态
        subtitle: '', //文章副标题
        content: '', //主体内容
        labels: [], //标签
      };
      this.resourceId = []; //栏目id
      this.labels = []; //标签
      this.postsImg = [];
    },
  },
};
</script>
<style lang="scss">
.el-dialog__body {
  img {
    width: 100%;
  }
}

.postAdd {
  .el-tag {
    margin: 0 10px 0 0;
  }
}

.tagInput {
  width: 150px;
}

.v-md-editor {
  background-color: var(--el-bg-color) !important;
}

.v-md-textarea-editor textarea {
  color: var(--text-color);
}

.v-md-editor--editable .v-md-editor__editor-wrapper {
  border-right: 1px solid var(--border-color);
}

.v-md-editor__toolbar {
  border-bottom: 1px solid var(--border-color);
}

.vuepress-markdown-body {
  color: var(--text-color);
  background-color: var(--el-bg-color);
}

.v-md-editor__toolbar-item {
  color: var(--text-color);
}

.v-md-editor__toolbar-item:hover {
  background-color: var(--border-color);
}

.v-md-editor__toolbar-item--active,
.v-md-editor__toolbar-item--active:hover {
  background: var(--border-color);
}

//.scrollbar__wrap{
//    background-color: var(--bg-brand-color);
//}
//
.avatar-uploader {
  border: 1px dashedvar(--text-color);
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader {
  border-radius: 6px;
  width: 150px;
  height: 150px;
}
</style>

<style scoped lang="scss">
.qsub-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.qsub-form-item {
  display: flex;
}

.qsub-form-label {
  text-align: right;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  line-height: 34px;
  width: 90px;
  padding: 0 22px 0 0;
  box-sizing: border-box;
  font-size: 15px;
}

.top {
  display: flex;
}

.avatar-uploader .avatar {
  display: block;
}

.el-upload-list__item-actions {
  border-radius: 6px;
  display: none;
  background-color: #00000085;
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  align-items: center;
  justify-content: space-evenly;
}

.avatar {
  border-radius: 6px;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar-uploader:hover {
  .el-upload-list__item-actions {
    display: flex;
  }
}
</style>
