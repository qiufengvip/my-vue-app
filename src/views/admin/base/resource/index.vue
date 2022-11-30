<!-- 资源管理 -->
<template>
  <div class="query-param-main">
    <div class="query-param-term"></div>
    <div class="query-param-function">
      <div class="query-param">
        <el-button type="primary" size="small" @click="getTableData">刷新</el-button>
      </div>
      <div class="query-param">
        <el-button type="success" size="small" @click="addResource(false)">添加资源</el-button>
      </div>
    </div>
  </div>
  <div class="table-node-main">
    <div class="custom-tree-node node-title">
      <div class="node-a">
        <div class="tree-resourceName">资源名称</div>
      </div>
      <div class="node-b">
        <div class="tree-resourceType">资源类型</div>
        <div class="tree-resourceValue">资源值</div>
        <div class="resourceData">资源数据</div>
        <div class="tree-bar">操作</div>
      </div>
    </div>
  </div>
  <div class="resourceList">
    <el-tree ref="resourceTree" :data="tableData" node-key="id" default-expand-all :expand-on-click-node="false" :draggable="true" @node-drag-end="nodeDragEnd">
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <div class="node-a">
            <div class="tree-resourceName">{{ data.resourceName }}</div>
          </div>
          <div class="node-b">
            <template v-for="item in resourceType">
              <div v-if="item.value === data.resourceType" class="tree-resourceType">{{ item.label }}</div>
            </template>
            <div class="tree-resourceValue">{{ data.resourceValue }}</div>
            <!--                    <div class="tree-resourceValue">&nbsp{{ data.resourceValue }}</div>-->
            <div class="resourceData">{{ data.resourceData }}</div>
            <div class="tree-bar">
              <el-button type="success" size="small" @click="addResource(data)">添加</el-button>
              <el-button type="primary" size="small" @click="exitResource(data)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteResource(data)">删除</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
  <el-dialog v-model="resourceAddVisible" :title="resourceAddTitle" width="500px">
    <el-form ref="ruleForm" size="small" :model="resourceAddData" label-width="100px">
      <el-form-item label="资源id" prop="name">
        <el-input v-model="resourceAddData.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="父id" prop="name">
        <el-input v-model="resourceAddData.pid" :disabled="true" />
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="resourceAddData.resourceName" />
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select v-model="resourceAddData.resourceType" placeholder="选择资源类型">
          <el-option v-for="item in resourceType" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="资源内容" prop="name">
        <el-input v-model="resourceAddData.resourceValue" type="textarea" />
      </el-form-item>
      <el-form-item label="资源值" prop="name">
        <el-input v-model="resourceAddData.resourceData" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="resourceAddVisible = false">取消</el-button>
        <el-button type="primary" @click="resourceAddSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { toTree } from '@/utils/dataDispose';
import { requestResourceDeletedById, requestResourceGetResourceList, requestResourceMobileData, requestResourceSaveOrUpdate, selectConstantData } from '@/http/interface/api';
import { ref } from 'vue';

const tableData = ref([]);
const resourceAddVisible = ref(false);
const resourceAddTitle = ref<string>('添加资源');
const resourceType = ref([]);
const resourceAddData = ref<any>({
  id: '',
  pid: '',
  resourceType: '',
  resourceName: '',
  resourceValue: '',
  resourceData: '',
});

onMounted(() => {
  selectConstantData({ code: 'resourceType' }).then((data: any) => {
    resourceType.value = data;
    getTableData();
  });
});

const load = (row: any, treeNode: any, resolve: any) => {
  requestResourceGetResourceList({ pid: row.id }).then((data: any) => {
    if (data.length === 0) {
      ElMessage.error('没有数据了');
      resolve([]);
    } else {
      resolve(data);
    }
  });
}; // 确认添加资源
const resourceAddSubmit = () => {
  requestResourceSaveOrUpdate(resourceAddData.value).then((res: any) => {
    if (resourceAddData.value.id) {
      ElMessage.success('更新成功');
    } else {
      ElMessage.success('添加成功');
    }
    getTableData();
    resourceAddVisible.value = false;
  });
}; //添加资源
const addResource = (row: any) => {
  resourceAddData.value = {};
  if (row) {
    resourceAddTitle.value = '添加子资源';
    resourceAddData.value.pid = row.id;
  }
  resourceAddVisible.value = true;
}; //修改资源
const exitResource = (row: any) => {
  console.log(JSON.parse(JSON.stringify(row)));
  resourceAddData.value = JSON.parse(JSON.stringify(row));
  resourceAddTitle.value = '修改资源';
  resourceAddVisible.value = true;
};
//删除资源
const deleteResource = (row: any) => {
  let data = {
    resourceId: row.id,
  };
  requestResourceDeletedById(data).then((res: any) => {
    ElMessage.success('成功');
    getTableData();
  });
};
const getTableData = () => {
  let data = {};
  requestResourceGetResourceList(data).then((res: any) => {
    tableData.value = toTree(res, null, null, 'children');
    console.log(tableData);
  });
};
const seekData = (data: any, pid: any) => {};

// 位于目标位置的方向(node:未移动  before:之上 after:之下  inner 插入 )
const nodeDragEnd = (Node: any, endNode: any, location: any, event: any) => {
  console.log(Node.data);
  console.log(endNode.data);
  console.log(location);
  console.log(event);
  let _this = this;
  let current = Node.data;
  let reference = endNode.data;
  console.log(current);
  console.log(reference);
  // return;
  if (location === 'inner') {
    // 跑到下面
    // current.pid == reference.id
    console.log('跑到下面', {
      cid: current.id,
      cname: current.resourceName,
      cpid: reference.id,
    });
    // return;
    requestResourceMobileData({
      cid: current.id,
      cpid: reference.id,
    }).then((res: any) => {
      getTableData();
    });
    //之上
  } else if (location === 'before' || location === 'after') {
    if (current.pid === reference.pid) {
      // 位置调整 互换rn
      // current.rn = reference.rn     reference.rn = current.rn;
      console.log('位置调整 互换rn', {
        cname: current.resourceName,
        cid: current.id,
        rid: reference.id,
        rname: reference.resourceName,
        crn: reference.rn,
        rrn: current.rn,
      });
      // return;
      requestResourceMobileData({
        cid: current.id,
        rid: reference.id,
        crn: reference.rn,
        rrn: current.rn,
      }).then((res: any) => {
        getTableData();
      });
    } else {
      // 移动层级
      // current.pid == reference.pid
      let data = {};
      data = {
        cid: current.id,
        cpid: reference.pid === null ? 'null' : reference.pid,
      };
      //上移
      if (location === 'before') {
        if (current.rn > reference.rn) {
          data = {
            cid: current.id,
            cpid: reference.pid === null ? 'null' : reference.pid,
            rid: reference.id,
            crn: reference.rn,
            rrn: current.rn,
          };
        }
      } else {
        //下移动
        if (current.rn < reference.rn) {
          data = {
            cid: current.id,
            cpid: reference.pid === null ? 'null' : reference.pid,
            rid: reference.id,
            crn: reference.rn,
            rrn: current.rn,
          };
        }
      }
      console.log('移动层级', data);
      requestResourceMobileData(data).then((res: any) => {
        getTableData();
      });
    }
  }
};
</script>
<style lang="scss">
.resourceList {
  .el-tree-node__content {
    height: 50px !important;
    border: 1px solid var(--border-color);
    margin-top: -1px;
  }
}
</style>
<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: 50px;
  font-size: 15px;
}

.node-a,
.tree-resourceName {
  //width: 30px;
}

.node-b {
  display: flex;
  align-items: center;
  //width: 1420px
}
.table-node-main {
  width: 100%;
  display: flex;
  font-size: 25px !important;
  font-weight: bold;
  color: var(--text-color);
}

.tree-resourceType {
  width: 210px;
  border-left: 1px solid var(--border-color);
  padding-left: 10px;
}

.tree-resourceValue {
  width: 210px;
  border-left: 1px solid var(--border-color);
  padding-left: 10px;
}

.resourceData {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  border-left: 1px solid var(--border-color);
  padding-left: 10px;
}

.tree-bar {
  width: 210px;
  border-left: 1px solid var(--border-color);
  padding-left: 10px;
}
.node-title {
  border: 1px solid var(--border-color);
  font-size: 17px !important;
  .tree-resourceName {
    padding-left: 10px;
  }
}
</style>
