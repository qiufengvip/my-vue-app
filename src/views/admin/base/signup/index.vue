<template>
  <div class="body">
    <div class="signup">
      <Login></Login>
      <div class="control">
        <el-button link type="warning">无法登陆?点击找回密码</el-button>
      </div>
      <div class="control">
        <el-button link type="primary">用户协议</el-button>
        <el-button link type="primary">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.body {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
  min-height: 700px;
  background: url(../../../../assets/img/login.jpg) 50% fixed no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    width: 400px;
    background: rgba(31, 31, 31, 0.36);
    margin-right: 10%;
    padding: 20px;
  }
  .control {
    margin-top: 10px;
  }
}

@media screen and (max-width: 800px) {
  .signup {
    margin-left: 10%;
  }
}
</style>
