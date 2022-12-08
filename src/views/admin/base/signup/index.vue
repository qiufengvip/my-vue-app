<template>
  <div class="body">
    <div class="login">
      <div class="title">登录</div>
      <div class="form">
        <div class="form-item">
          <span>账号:</span>
          <el-input v-model="user.userName" width="50px" placeholder="请输入账号"></el-input>
        </div>
        <div class="form-item">
          <span>密码:</span>
          <el-input v-model="user.password" width="50px" show-password placeholder="请输入密码"></el-input>
        </div>
      </div>
      <div class="operation">
        <el-button type="primary" @click="loginSubmit">登录</el-button>
        <el-button type="warning" @click="signUp">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { requestLogin, requestSe } from '@/http/interface/api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const user = ref({ userName: '秋枫', password: 'yang@2580' });

let router = useRouter();

const loginSubmit = () => {
  requestLogin(user.value).then((data: any) => {
    ElMessage.success('登录成功');
    let userData: any = { name: data.tokenName, value: data.tokenValue };
    sessionStorage.setItem('token', userData);
    sessionStorage.setItem('admin-menu', JSON.stringify(data.menuList));
    router.push({ path: '/admin' });
  });
};
const signUp = () => {
  requestSe(null).then((res: any) => {
    ElMessage.success(res);
  });
};
</script>

<style scoped lang="scss">
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
  width: 100vm;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-brand-color);
  color: var(--text-color);
}

.login {
  background-color: var(--el-bg-color);
  width: 400px;
  height: 300px;
  border-radius: 5px;
}
.login input {
  //width: 200px;
  //height: 100px;
}

.title {
  //width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 23px;
  font-weight: bold;
  border-bottom: 1px solid var(--border-color);
}

.form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.form-item {
  display: flex;
  //justify-content: center;
  align-items: center;
  padding: 10px;
}
.form-item span {
  width: 40px;
}

.el-input {
  width: 200px;
}

.operation {
  display: flex;
  //width: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 0 40px 0 40px;
}
</style>
