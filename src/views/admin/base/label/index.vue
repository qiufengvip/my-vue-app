<!--标签管理-->
<template>
  <div class="top-center-bottom">
    <div class="query-param-main">
      <div class="query-param-term">
        <div class="query-param">
          <el-input v-model="queryParam.name" style="width: 200px" size="small" placeholder="名称">
            <template #prepend>名称</template>
          </el-input>
        </div>
      </div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </div>
    </div>
    <div class="center">
      <el-table border :data="tableData" style="">
        <el-table-column fixed type="index" width="50" label="序号" />
        <el-table-column prop="name" label="标签名称" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope" #default>
            <el-button type="danger" size="small" @click="deleted(scope.row)">删除</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { post } from '../../../../http/http';
import { API } from '../../../../http/interface/api';

interface pagination {
  pageSize: number; //每页多少条
  total: number; //共多少条
  pageNum: number; //当前页
}

const queryParam = ref<pagination>({});
const tableData = ref([]);
const pagination = ref<pagination>({
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
  post(API.getLabelList, queryParam).then((res: any) => {
    if (res) {
      tableData.value = res.list;
      pagination.pageNum = res.pageNum;
      pagination.total = res.total;
    }
  });
};
const deleted = (row: any) => {
  ElMessageBox.confirm('确定要删除嘛?', 'Warning', {
    confirmButtonText: '对',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      post(API.deletedLabel, { id: row.id }).then((res: any) => {
        if (res.code === 0) {
          ElMessage.success('删除成功');
          getList();
        } else {
          ElMessage.error(res.msg);
        }
      });
    })
    .catch(() => {});
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
