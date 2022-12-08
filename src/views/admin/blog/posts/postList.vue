<template>
  <div ref="main" class="top-center-bottom">
    <div ref="queryParamMain" class="query-param-main">
      <div class="query-param-term">
        <div class="query-param">
          <el-input v-model="queryParam.title" placeholder="文章名称" size="small" style="width: 300px">
            <template #prepend>文章名称</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-select v-model="queryParam.state" placeholder="审核状态" size="small" style="width: 150px">
            <el-option v-for="item in postStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="query-param">
          <el-select v-model="queryParam.releases" placeholder="发布状态" size="small" style="width: 150px">
            <el-option v-for="item in postReleaseList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="query-param">
          <el-cascader :key="subtotalKey" v-model="queryParam.resourceId" :options="subtotal" :props="props1" filterable placeholder="审核状态" size="small" />
        </div>

        <div class="query-param">
          <el-date-picker
            v-model="startTime"
            end-placeholder="选择时间"
            format="YYYY-MM-DD"
            placeholder="更新时间"
            range-separator="到"
            size="small"
            start-placeholder="更新时间"
            type="daterange"
            unlink-panels
            value-format="YYYY-MM-DD"
          />
        </div>
      </div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button size="small" type="success" @click="getList()">查询</el-button>
        </div>
        <!--                <div class="query-param">-->
        <!--                    <el-button type="primary" size="small">修改密码</el-button>-->
        <!--                </div>-->
        <!--                <div class="query-param">-->
        <!--                    <el-button type="warning" size="small">封禁账户</el-button>-->
        <!--                </div>-->
        <!--                <div class="query-param">-->
        <!--                    <el-button type="danger" size="small">删除用户</el-button>-->
        <!--                </div>-->
      </div>
    </div>
    <div ref="centerMain" class="center">
      <el-table ref="userTable" :data="tableData" border style="height: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed label="序号" type="index" width="50" />
        <el-table-column fixed label="缩略图" width="175">
          <template #default="scope">
            <el-image :src="scope.row.postsImg" fit="cover" style="width: 150px; height: 100px" viewer="scope.row.title">
              <template #error>
                <div class="img-error">暂无缩略图</div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column fixed label="文章标题" prop="title" width="300" />
        <el-table-column label="发布" prop="state" width="80">
          <template #default="scope">
            <template v-for="item in postStateList">
              <div v-if="item.value === scope.row.state" class="tree-resourceType">
                {{ item.label }}
              </div>
            </template>
          </template>
        </el-table-column>

        <el-table-column label="审核" prop="state" width="80">
          <template #default="scope">
            <template v-for="item in postReleaseList">
              <div v-if="item.value === scope.row.releases" class="tree-resourceType">
                {{ item.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed label="更新时间" width="180">
          <template #default="scope">
            <div>{{ getTime(scope.row.updateTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="概括" prop="subtitle" />

        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope" #default>
            <el-button size="small" type="primary" @click="edits(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleted(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div ref="bottomMain" class="bottom">
      <el-pagination
        :page-size="pagination.pageSize"
        :page-sizes="[20, 60, 100, 300]"
        :total="pagination.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { API } from '@/http/interface/api';
import { post } from '../../../../http/http';
import { ElMessage } from 'element-plus';
import { toTree } from '@/utils/dataDispose';

const postReleaseList = ref([]); // 发布草稿 状态
const postStateList = ref([]); //审核状态 列表
const queryParam = ref();
const stateList = ref([]);
const tableData = ref<any[]>([]);
const pagination = ref({
  pageSize: 20, //每页多少条
  total: 0, //共多少条
  pageNum: 1, //当前页
});
const subtotal = ref([]); //帖子分类列表
const subtotalKey = ref(-5); //key
const props1 = ref({
  //帖子分类渲染配置
  checkStrictly: true,
  emitPath: false,
});
const startTime = ref([]);
const multipleSelection = ref([]);

const handleClick = (click: any) => {
  console.log(click);
};
const getList = () => {
  queryParam.value.pageSize = pagination.value.pageSize;
  queryParam.value.pageNum = pagination.value.pageNum;
  if (startTime.value.length === 2) {
    queryParam.value.startTime = JSON.stringify(startTime.value);
  } else {
    queryParam.value.startTime = '';
  }
  post(API.getPostList, queryParam).then((res: any) => {
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
  getList();
};
//换页
const handleCurrentChange = (currentPage: any) => {
  pagination.value.pageNum = currentPage;
  getList();
};
const getTime = (time: any) => {
  return new Date(time).Format('yyyy-MM-dd hh:mm:ss');
};
const edits = (item: any) => {
  // this.$emit('addTabs', {
  //   name: item.id,
  //   title: item.title,
  //   content: 'postEdit',
  // });
};

//删除
const deleted = () => {};
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

onMounted(() => {
  post(API.selectConstantData, { code: 'postRelease' }).then((res: any) => {
    if (res.code === 0) {
      postReleaseList.value = res.data;
    }
  });
  post(API.selectConstantData, { code: 'postState' }).then((res: any) => {
    if (res.code === 0) {
      postStateList.value = res.data;
    }
  });
  post(API.selectConstantData, { code: 'userState' }).then((res: any) => {
    if (res.code === 0) {
      stateList.value = res.data;
    }
  });
  post(API.queryRuleResource, { resourceType: 1 }).then((res: any) => {
    if (res.code === 0) {
      let data = res.data;
      data.forEach((item: any) => {
        item.label = item.resourceName;
        item.value = item.id;
      });
      subtotal.value = toTree(data, '0b23919cb72a40afb15d9f2d533ed48b', null, 'children');
    } else {
      ElMessage.error(res.msg);
    }
  });
  getList();
});
</script>

<style lang="scss" scoped>
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

.img-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--border-color);
}
</style>
