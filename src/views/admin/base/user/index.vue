<template>
  <div ref="main" class="top-center-bottom">
    <div ref="queryParamMain" class="query-param-main">
      <div class="query-param-term">
        <div class="query-param">
          <el-input v-model="queryParam.userName" style="width: 200px" size="small" placeholder="昵称">
            <template #prepend>昵称</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-input v-model="queryParam.phone" style="width: 230px" size="small" placeholder="手机号">
            <template #prepend>手机号</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-input v-model="queryParam.email" style="width: 250px" size="small" placeholder="邮箱">
            <template #prepend>邮箱</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-select v-model="queryParam.state" style="width: 150px" size="small" placeholder="账户状态">
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="success" size="small">查询</el-button>
        </div>
        <div class="query-param">
          <el-button type="primary" size="small">修改密码</el-button>
        </div>
        <div class="query-param">
          <el-button type="warning" size="small">封禁账户</el-button>
        </div>
        <div class="query-param">
          <el-button type="danger" size="small">删除用户</el-button>
        </div>
      </div>
    </div>
    <div ref="centerMain" class="center">
      <el-table ref="userTable" border :data="tableData" style="height: 100%">
        <el-table-column fixed type="index" width="50" label="序号" />
        <el-table-column fixed label="头像" width="70">
          <template #default="scope">
            <el-avatar :src="scope.row.headImg" />
          </template>
        </el-table-column>
        <el-table-column fixed prop="account" label="昵称" width="150" />
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="github" label="github" width="200" />
        <el-table-column prop="gitee" label="gitee" width="200" />
        <el-table-column prop="ip" label="注册地址" />
        <el-table-column fixed="right" label="操作" width="160">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="handleClick">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div ref="bottomMain" class="bottom">
      <el-pagination
        background
        :page-sizes="[20, 60, 100, 300]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { post } from '../../../../http/http';
import { API, request_user_getUserList } from '../../../../http/interface/api';
import { ElMessage } from 'element-plus';

const queryParam = ref();
const stateList = ref([]);
const tableData = ref([]);
const pagination = ref({
  pageSize: 20, //每页多少条
  total: 0, //共多少条
  pageNum: 1, //当前页
});

onMounted(() => {
  post(API.selectConstantData, { code: 'userState' }).then((res: any) => {
    if (res.code === 0) {
      stateList.value = res.data;
    }
  });
  getUserList();
});

const handleClick = (click: any) => {
  console.log(click);
};
const getUserList = () => {
  queryParam.value.pageSize = pagination.value.pageSize;
  queryParam.value.pageNum = pagination.value.pageNum;
  request_user_getUserList(queryParam).then((res: any) => {
    if (res.code) {
      ElMessage.error(res.msg);
    } else {
      tableData.value = res.list;
      pagination.value.pageNum = res.pageNum;
      pagination.value.total = res.total;
    }
  });
};
// 每页条数被改变
const handleSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize; //每页多少条被改变
  handleCurrentChange(1);
  getUserList();
}; //换页
const handleCurrentChange = (currentPage: number) => {
  pagination.value.pageNum = currentPage;
  getUserList();
};
</script>

<style scoped>
.common-layout {
  height: 100%;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.el-container {
  display: flex;
  flex-direction: column;
}

.el-header {
  height: 100px;
}

.qsub-main {
  flex: 1;
}

.el-footer {
  height: 100px;
}

.top-center-bottom {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-center-bottom .top {
  height: 60px;
}

.top-center-bottom .center {
  flex: 1;
}
.center {
  padding-left: 10px;
}

.bottom {
  padding-top: 10px;
  padding-left: 10px;
}
</style>
