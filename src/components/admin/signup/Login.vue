<template>
  <div class="login-main">
    <div class="title">欢迎登录</div>
    <div class="form">
      <div class="form-item">
        <el-input v-model="user.userName" class="form-input" :prefix-icon="UserFilled" width="50px" placeholder="请输入账号"></el-input>
      </div>
      <div class="form-item">
        <el-input v-model="user.password" class="form-input" :prefix-icon="Lock" width="50px" show-password placeholder="请输入密码"></el-input>
      </div>

      <div class="form-item-verify">
        <el-input v-model="user.verify" class="form-input-verify" :prefix-icon="ScaleToOriginal" placeholder="验证码"></el-input>
        <div class="verify-img">
          <el-tooltip class="box-item" content="看不清?点击更换" placement="bottom-start">
            <img :src="requestGetVerifyCode()" alt="verify" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="operation">
      <el-button color="#626aef" class="login-button" type="primary" @click="loginSubmit">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { requestGetVerifyCode, requestLogin, requestSe } from '@/http/interface/api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Lock, ScaleToOriginal, UserFilled } from '@element-plus/icons';

const user = ref({ userName: '秋枫', password: 'yang@2580', verify: '1234' });

const verifyCode = ref('');

let router = useRouter();

onMounted(() => {
  getVerifyCode();
});

/**
 * 获取验证码
 */
const getVerifyCode = async () => {
  verifyCode.value = await requestGetVerifyCode();
};

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
.login-main {
  width: 250px;
  .title {
    color: white;
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
    padding: 10px;

    .form-item-verify {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .form-input-verify {
        width: 120px;
      }
      .verify-img {
        width: 90px;
        height: 32px;
        border-radius: 5px;
        img {
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
      }
    }

    .form-item {
      display: flex;
      //justify-content: center;
      align-items: center;
      width: 100%;
      padding: 10px;
      .form-input {
        width: 100%;
      }
    }
  }

  .login-button {
    width: 100%;
  }

  .operation {
    display: flex;
    //width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
  }
}
</style>
