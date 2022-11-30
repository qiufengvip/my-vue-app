<template>
  <el-form :model="userForm" label-width="120px">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>人员编辑</span>
        </div>
      </template>

      <el-upload :before-upload="beforeImgUpload" :on-success="userImgSuccess" :show-file-list="false" action="https://jsonplaceholder.typicode.com/posts/" class="avatar-uploader">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="登录名">
            <el-input v-model="userForm.account" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户昵称">
            <el-input v-model="userForm.userName" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-card>

    <el-row>
      <el-col :span="12">
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号">
          <el-input v-model="userForm.phone" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="用户状态">
      <el-select v-model="userForm.deleted" placeholder="用户禁用状态">
        <el-option label="禁用" value="1" />
        <el-option label="启用" value="0" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

interface userForm {
  account: string; //登录名
  deleted: number; //是否删除
  email: string; //  邮箱
  userName: string; //用户昵称
  phone: string; //手机
  github: string;
  gitee: string;
  headImg: string; //头像
}

const userForm = ref<userForm>({
  account: '',
  deleted: 1,
  email: '',
  userName: '',
  phone: '',
  github: '',
  gitee: '',
  headImg: '',
});

const imageUrl = ref();
onMounted(() => {});

const userImgSuccess = (response: any, uploadFile: any, uploadFiles: any) => {};
//文件上传前 验证函数
const beforeImgUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    //判断文件类型
    ElMessage.error('文件格式只能为jpg,png');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    // 判断文件大小
    ElMessage.error('文件最大为 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped></style>
