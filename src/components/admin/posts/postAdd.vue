<template>
  <!--  新增文章  -->
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
              <el-tag v-for="tag in labels" class="mx-1" closable :disable-transitions="false" :type="getType()" @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input
                v-if="labelsInputVisible"
                ref="labelsInputRef"
                v-model="labelsInputValue"
                class="tagInput"
                show-word-limit
                size="small"
                @keyup.enter="handleInputConfirm(true)"
                @blur="handleInputConfirm(false)"
              />
              <el-button v-else type="success" class="button-new-tag ml-1" size="small" @click="showInput"> + 添加标签 </el-button>
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

<script lang="ts" setup>
import { post } from '../../../http/http';
import { API, uploadFile } from '../../../http/interface/api';
import { toTree } from '../../../utils/dataDispose';
import { ElMessage, ElNotification } from 'element-plus';

const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const props1 = ref({
  checkStrictly: true,
});
const labelsInputRef = ref();
const postStateList = ref([]); //文章审核状态
const postReleaseList = ref([]); //文章发布状态
const subtotal = ref([
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
]); //分类菜单
const form = ref<any>({
  id: '', //文章id
  title: '', //文章标题
  postsImg: '', //缩略图
  resourceId: '', //栏目id
  state: 1, //发布状态
  releases: 1, //审核状态
  subtitle: '', //文章副标题
  content: '', //主体内容
  labels: [], //标签
});
const subtotalKey = ref(-5); //key
const resourceId = ref([]); //栏目id
const labels = ref<any[]>([]); //标签
const postsImg = ref([]);
const labelsInputVisible = ref(false);
const labelsInputValue = ref(''); //
const searchKeyInputVisible = ref(false);
const searchKeyInputValue = ref(''); //
const model = ref(1); //默认是一 加载缓存库中最新的数据
const tabsId = ref('f8a013b9ae1d4615b047fcf0550e8a71'); //本页面的id
const interval = ref();

onMounted(() => {
  post(API.selectConstantData, { code: 'postState' }).then((res: any) => {
    if (res.code === 0) {
      postStateList.value = res.data;
    }
  });
  post(API.selectConstantData, { code: 'postRelease' }).then((res: any) => {
    if (res.code === 0) {
      postReleaseList.value = res.data;
    }
  });
  readData();
});

const automatically = () => {
  console.log('新建文章关闭自动保存方法');
  if (interval.value) {
    clearInterval(interval.value);
  }
};
const readData = () => {
  if (model.value === 1) {
    //获取文章分类
    post(API.queryRuleResource, { resourceType: 1 }).then((res: any) => {
      if (res.code === 0) {
        let data = res.data;
        data.forEach((item: any) => {
          item.label = item.resourceName;
          item.value = item.id;
        });
        subtotal.value = toTree(data, '0b23919cb72a40afb15d9f2d533ed48b', null, 'children');
        // ElMessage.success(res.msg)
      }
    });
  }
};
const handleCopyCodeSuccess = (code: string) => {
  console.log(code);
};
const uploadImage = (event: any, insertImage: any, files: any) => {
  ElNotification({
    title: '上传提示',
    message: '正在快马加鞭，努力上传中...',
    type: 'success',
  });
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files);
  let name1 = files[0].name;
  uploadFile(files[0]).then((res: any) => {
    if (res.code === 0) {
      insertImage({
        url: res.data,
        desc: name1,
      });
      handleAvatarSuccess();
    } else {
      ElMessage.error(res.msg);
    }
  });
};
const articleSave = () => {
  console.log('文章保存');
};
const submits = () => {
  automaticStorage(2, true); //发布
};
const getType = () => {
  let number = parseInt(String(5 * Math.random()));
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
};
const handleClose = (tag: any) => {
  let indexOf = labels.value.indexOf(tag);
  labels.value.splice(indexOf, 1);
};
const showInput = () => {
  labelsInputVisible.value = true;
  labelsInputRef.value.focus();
};
//标签添加成功或失败
const handleInputConfirm = (type: boolean) => {
  // 'labelsInputValue', 'labels', 'labelsInputVisible'
  if (type) {
    if (labelsInputValue.value) {
      labels.value.push(labelsInputValue.value);
    }
  } else {
    console.log('取消');
    labelsInputVisible.value = false;
  }
  labelsInputValue.value = '';
};
//缩略图上传
const handleAvatarSuccess = () => {
  //response: any, uploadFile: any
  document.getElementsByClassName('el-upload')[0].style.display = 'none';
  console.log('成功', uploadFile);
};
//缩略图格式验证器
const beforeAvatarUpload = (rawFile: any) => {
  console.log(rawFile.type.slice(0, 6));
  if (rawFile.type.slice(0, 6) !== 'image/') {
    ElMessage.error('应上传图片');
  } else if (rawFile.size / 1024 / 1024 > 40) {
    ElMessage.error('不能大于 40MB!');
  }
  uploadFile(rawFile).then((res: any) => {
    if (res.code === 0) {
      form.value.postsImg = res.data;
      handleAvatarSuccess();
    } else {
      ElMessage.error(res.msg);
    }
  });
  return false;
};

const handlePostsImg = (fileUrl: string, index: number) => {
  switch (index) {
    case 1:
      dialogVisible.value = true;
      dialogImageUrl.value = fileUrl;
      break;
    case 2:
      open(fileUrl);
      break;
    case 3:
      form.value.postsImg = '';
      document.getElementsByClassName('el-upload')[0].style.display = 'block';
      break;
  }
  console.log('点击', index);
};
//自动缓存
const automaticStorage = (state: any, user: any) => {
  form.value.resourceId = resourceId.value[resourceId.value.length - 1];
  form.value.labels = JSON.stringify(labels.value);
  let data = JSON.parse(JSON.stringify(form.value));
  data.state = 1;
  if (state) {
    data.state = state;
  }
  data.manual = user || false;
  post(API.postSetCache, data).then((res: any) => {
    if (res.code === 0) {
      if (state === 2) {
        ElNotification({
          title: '发布',
          message: '发布成功',
          type: 'success',
        });
        //  这里炸额嘞
        // this.$emit('removeTab', this.tabsId);
      } else {
        ElNotification({
          title: '远程存储',
          message: res.msg,
          type: 'success',
        });
      }
      if (res.data) {
        form.value.id = res.data;
      }
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//暂存按钮
const staging = () => {
  automaticStorage(1, true); //存草稿
};

// 初始化
const removePage = () => {
  form.value = {
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
  resourceId.value = []; //栏目id
  labels.value = []; //标签
  postsImg.value = [];
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
