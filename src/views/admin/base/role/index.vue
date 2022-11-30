<!-- 角色管理 -->
<template>
  <div class="top-center-bottom">
    <div class="query-param-main">
      <div class="query-param-term"></div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="primary" size="small" @click="getRoleList">查询</el-button>
          <el-button type="success" size="small" @click="addRole">添加</el-button>
        </div>
      </div>
    </div>
    <div class="center">
      <el-table border :data="tableData" style="">
        <el-table-column prop="id" label="id" width="300" />
        <el-table-column prop="roleCode" label="角色code" width="200" />
        <el-table-column prop="roleName" label="角色名称" width="200" />
        <el-table-column prop="roleType" label="角色类型">
          <template #default="scope">
            <template v-for="item in roleType">
              <div v-if="item.value === scope.row.roleType" class="tree-resourceType">
                {{ item.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope" #default>
            <el-button type="primary" size="small" @click="exitRole(scope.row)">编辑</el-button>
            <el-button type="success" size="small" @click="addUser(scope.row)">添加人员</el-button>
            <el-button type="danger" size="small" @click="deleted(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom"></div>
  </div>

  <el-dialog v-model="addRoleVisible" :title="addRoleTable" width="500px">
    <el-form ref="ruleForm" :model="roleData" label-width="100px">
      <div>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleData.roleName" size="large" />
        </el-form-item>
        <el-form-item label="角色code" prop="name">
          <el-input v-model="roleData.roleCode" size="large" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="addRuleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addUserToRoleVisible" :title="addUserToRole" width="700px">
    <div class="dialog-main">
      <el-transfer
        v-model="transferValue"
        :titles="['未添加', '已添加']"
        :props="{
          key: 'virtualUserId',
          label: 'userName',
        }"
        :data="transferData"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addUserToRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="addUserToRoleCom">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import {
  request_rule_addRole,
  request_rule_deleted,
  request_rule_getRoleList,
  request_user_getUserList,
  request_virtualUserRole_getUserRole,
  request_virtualUserRole_virtualUserRole,
} from '../../../../http/interface/api';

const tableData = ref([]); //角色list
const roleType = ref([
  {
    //角色 Type
    label: '普通角色',
    value: 1,
  },
  {
    label: '用户',
    value: 2,
  },
]);
const addRoleVisible = ref(false); //添加角色框
const roleData = ref<any>({ roleName: '', roleCode: '' }); //添加或修改角色data
const addRoleTable = ref('添加角色'); //添加或修改角色标题
const addUserToRole = ref('添加用户'); //添加用户框标题
const addUserToRoleVisible = ref(false); // 添加用户框
const transferData = ref([]); //添加用户穿梭框data
const transferValue = ref([]); //已经添加用户
const roleId = ref(''); //当前选中的roleId

onMounted(() => {
  getRoleList();
});

const getRoleList = () => {
  request_rule_getRoleList({}).then((res: any) => {
    if (res.code === 0) {
      tableData.value = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
}; // 删除
const deleted = (row: any) => {
  let data = {
    id: row.id,
  };
  request_rule_deleted(data).then((res: any) => {
    if (res.code === 0) {
      getRoleList();
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加角色 提交
const addRuleSubmit = () => {
  if (!roleData.value.roleName) {
    ElMessage.error('请填写角色名');
    return;
  }
  request_rule_addRole(roleData).then((res: any) => {
    if (res.code === 0) {
      ElMessage.success(res.msg);
      getRoleList();
      addRoleVisible.value = false;
      roleData.value.roleName = '';
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加角色
const addRole = () => {
  addRoleTable.value = '添加角色';
  roleData.value = {};
  addRoleVisible.value = true;
}; // 修改角色
const exitRole = (row: any) => {
  console.log(row);
  addRoleTable.value = '修改角色';
  roleData.value = {
    id: row.id,
    roleName: row.roleName,
    roleCode: row.roleCode,
  };
  console.log(roleData);
  addRoleVisible.value = true;
};
//
const addUserToRoleCom = () => {
  let roleIds = [];
  roleIds.push(roleId.value);
  let data = {
    roleIds: JSON.stringify(roleIds),
    userIds: JSON.stringify(transferValue.value),
  };
  request_virtualUserRole_virtualUserRole(data).then((res: any) => {
    if (res.code === 0) {
      ElMessage.success(res.msg);
      addUserToRoleVisible.value = false;
    } else {
      ElMessage.error(res.msg);
    }
  });
  console.log(transferValue);
};
//获取用户
const getTransferData = () => {
  request_user_getUserList({ pageSizeZero: true, pageSize: 0 }).then((res: any) => {
    if (res.code) {
      ElMessage.error(res.msg);
    } else {
      transferData.value = res.list;
      // _this.transferValue = res.list[0].id;
    }
  });
};
const addUser = (row: any) => {
  roleId.value = row.id;
  request_virtualUserRole_getUserRole({ roleId: row.id }).then((res: any) => {
    if (res.code === 0) {
      addUserToRoleVisible.value = true;
      transferData.value = res.data.list;
      transferValue.value = res.data.includeList;
    } else {
      ElMessage.error(res.code);
    }
  });
};
</script>

<style scoped></style>
