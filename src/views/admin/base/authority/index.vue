<!-- 权限管理 -->
<template>
  <el-row :gutter="20">
    <el-col :span="3">
      <div class="left-head">
        <div class="head-title">
          <span>角色列表</span>
          <el-icon style="cursor: pointer" @click="addRuleVisible = true">
            <SvgIcon name="add"></SvgIcon>
          </el-icon>
        </div>

        <el-divider>
          <el-icon>
            <SvgIcon name="heart"></SvgIcon>
          </el-icon>
        </el-divider>
      </div>
      <el-tree ref="ruleTree" :highlight-current="true" node-key="id" :current-node-key="roleChecked" :data="roleTreeData" :props="TreeProps" @node-click="handleNodeClick" />
    </el-col>
    <el-divider direction="vertical" />
    <el-col :span="20">
      <div class="grid-content bg-purple">
        <el-tabs v-model="activeName" class="qsub-resource-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="itemMain in resourceList" :label="itemMain.resourceName" :name="itemMain.id">
            <template v-for="item in itemMain.children">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <el-checkbox v-model="item.checked" :label="item.resourceName" size="large" @change="checkboxOnClick(item.checked, item.id, item.children)" />
                  </div>
                </template>
                <div class="qsub-box-main">
                  <div v-for="o in item.children" class="box-item">
                    <el-checkbox v-model="o.checked" :label="o.resourceName" size="large" @change="checkboxOnClick(o.checked, o.id, [])" />
                  </div>
                </div>
              </el-card>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>

  <el-dialog v-model="addRuleVisible" title="添加角色" width="500px">
    <el-form ref="ruleForm" :model="roleData" :rules="rules" label-width="100px">
      <div>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleData.roleName" size="large" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addRuleVisible = false">取消</el-button>
        <el-button type="primary" @click="addRuleSubmit">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { requestResourceGetSubset, requestResourceQueryRuleResource, requestResourceRoleAddResource, requestRuleAddRole, requestRuleGetRoleList } from '@/http/interface/api';
import { lookingBranch } from '@/utils/dataDispose';
import SvgIcon from '@/components/common/SvgIcon/index.vue';
import { ref } from 'vue';

const roleTreeData = ref([]);
const TreeProps = ref({
  // children: 'children',  //子集 这里不用
  label: 'roleName',
});
const roleChecked = ref('36ded9bd88d24cd39dbed61f09d4356f');
const addRuleVisible = ref(false); // 添加角色弹窗
const roleData = ref({
  roleName: '',
});
const rules = ref({
  name: [{ min: 1, max: 8, message: '长度3-8之间', trigger: 'blur' }],
});
const resourceList = ref({});
const activeName = ref(''); //tab选择项
onMounted(() => {
  getroleList();
  getRoleResource();
});

//树形图被点击
const handleNodeClick = (data: any) => {
  roleChecked.value = data.id;
  getRoleResource();
};
//添加角色 提交
const addRuleSubmit = () => {
  if (!roleData.value.roleName) {
    ElMessage.error('请填写角色名');
    return;
  }
  requestRuleAddRole(roleData.value).then((res: any) => {
    ElMessage.success('添加成功');
    getroleList();
    addRuleVisible.value = false;
    roleData.value.roleName = '';
  });
};
const getroleList = () => {
  requestRuleGetRoleList({ type: 1 }).then((data: any) => {
    roleTreeData.value = data;
    roleChecked.value = data[0].id;
  });
};
// 获取资源  角色id
const getResourceList = (roleId: string) => {
  roleChecked.value = roleId;
}; //获取角色拥有的资源    参数  是否保留 选中tab标签
const getRoleResource = (retainIsOpt: boolean = false) => {
  // 获取所有资源
  let resourceId: any = null;
  requestResourceGetSubset().then(() => {
    requestResourceQueryRuleResource({ roleId: roleChecked.value }).then((data: any) => {
      let meResourceList = data;
      // 复制是否点击
      data.forEach((item: any) => {
        item.checked = meResourceList.indexOf(item.id) > -1;
      });
      let a: any[] = [],
        b: any[] = [];
      // 解析 tab标签页面
      data.forEach((item: any) => {
        if (item.pid === resourceId) {
          a.push(item);
        } else {
          b.push(item);
        }
      });
      // 解析卡片标题
      a.forEach((item) => {
        item['children'] = [];
        b.forEach((item2) => {
          if (item.id === item2.pid) {
            item2['children'] = lookingBranch(b, item2.id);
            item['children'].push(item2);
          }
        });
      });
      if (!retainIsOpt) {
        activeName.value = a[0].id;
      }
      resourceList.value = a;
    });
  });
};
// 资源tab被单击
const handleClick = (tab: any, event: any) => {
  console.log(tab, event);
};
//资源选择框被单击
const checkboxOnClick = (value: any, id: any, children: any) => {
  console.log(value);
  let resourceIds = [];
  let data = {
    role: roleChecked.value,
    isAdd: value,
    resourceIds: '',
  };
  if (id) {
    resourceIds.push(id);
  }
  if (children) {
    children.forEach((item: any) => {
      resourceIds.push(item.id);
    });
  }
  data.resourceIds = JSON.stringify(resourceIds);
  requestResourceRoleAddResource(data).then(() => {
    ElMessage.success('成功');
    if (children) {
      getRoleResource(true);
    }
  });
};
</script>
<style lang="scss">
.qsub-resource-tabs {
  .el-tabs__item.is-active {
    background-color: #00000000;
  }
}
</style>

<style scoped lang="scss">
.left-head {
  color: var(--text-color);
}

.head-title {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.el-row,
.el-col {
  height: 100%;
}

.head-title .el-icon {
  margin-left: 10px;
}

.box-card {
  margin-bottom: 20px;
}

.qsub-box-main {
  display: flex;
}

.box-item {
  padding: 10px;
}
</style>
