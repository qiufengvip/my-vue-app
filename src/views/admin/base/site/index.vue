<!-- 站点属性 -->
<template>
  <div class="top-center-bottom">
    <div class="query-param-main">
      <div class="query-param-term">
        <div class="query-param">
          <el-input v-model="queryParam.name" style="width: 200px" size="small" placeholder="名称">
            <template #prepend>名称</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-input v-model="queryParam.code" style="width: 200px" size="small" placeholder="编码">
            <template #prepend>编码</template>
          </el-input>
        </div>
      </div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
          <el-button type="success" size="small" @click="add">添加</el-button>
        </div>
      </div>
    </div>

    <div class="center">
      <el-table border :data="tableData" style="">
        <el-table-column prop="code" label="配置项code" width="200" />
        <el-table-column prop="name" label="配置项名称" width="200" />
        <el-table-column prop="value" label="配置项值" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope" #default>
            <el-button type="primary" size="small" @click="exit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleted(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
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
  </div>

  <el-dialog v-model="addVisible" :title="addTable" width="500px">
    <el-form ref="ruleForm" :model="datas" label-width="100px">
      <div>
        <el-form-item label="名称" prop="name">
          <el-input v-model="datas.name" size="large" />
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="datas.code" size="large" />
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="datas.value" type="textarea" size="large" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { post } from '../../../../http/http';
import { API } from '../../../../http/interface/api';
import { ElMessage } from 'element-plus';

const tableData = ref([]); //角色list
const addVisible = ref(false); //添加角色框
const datas = ref({ name: '', code: '' }); //添加或修改data
const addTable = ref('添加配置'); //添加或修改标题
const queryParam = ref({
  //搜索条件
  name: '',
  code: '',
  pageSize: 20,
  pageNum: 1,
});
const pagination = ref({
  pageSize: 20, //每页多少条
  total: 0, //共多少条
  pageNum: 1, //当前页
});
onMounted(() => {
  getList();
});

const getList = () => {
  queryParam.value.pageSize = pagination.value.pageSize;
  queryParam.value.pageNum = pagination.value.pageNum;
  post(API.getConfigList, queryParam).then((res: any) => {
    if (res.code === 0) {
      tableData.value = res.data.list;
    } else {
      ElMessage.error(res.msg);
    }
  });
}; // 删除
const deleted = (row: any) => {
  let data = {
    id: row.id,
  };
  post(API.deletedBlogConfig, data).then((res: any) => {
    if (res.code === 0) {
      getList();
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加角色 提交
const addSubmit = () => {
  if (!datas.value.name) {
    ElMessage.error('请填写名称');
    return;
  }
  if (!datas.value.code) {
    ElMessage.error('请填写code');
    return;
  }
  post(API.updateBlogConfig, datas).then((res: any) => {
    if (res.code === 0) {
      ElMessage.success(res.msg);
      getList();
      addVisible.value = false;
      datas.value.name = '';
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加
const add = () => {
  addTable.value = '添加配置';
  datas.value = { name: '', code: '' };
  addVisible.value = true;
}; // 修改
const exit = (row: any) => {
  console.log(row);
  addTable.value = '修改配置';
  datas.value = {
    id: row.id,
    name: row.name,
    code: row.code,
    value: row.value,
  };
  console.log(datas.value);
  addVisible.value = true;
};
// 每页条数被改变
const handleSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize; //每页多少条被改变
  handleCurrentChange(1);
  getList();
}; //换页
const handleCurrentChange = (currentPage: number) => {
  pagination.value.pageNum = currentPage;
  getList();
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
