<!--系统变量-->
<template>
  <div ref="main" class="top-center-bottom">
    <div ref="queryParamMain" class="query-param-main">
      <div class="query-param-term">
        <div class="query-param">
          <el-input v-model="queryParam.code" style="width: 200px" size="small" placeholder="代码">
            <template #prepend>变量代码</template>
          </el-input>
        </div>
        <div class="query-param">
          <el-input v-model="queryParam.name" style="width: 200px" size="small" placeholder="名称">
            <template #prepend>变量名称</template>
          </el-input>
        </div>
      </div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="success" size="small" @click="getList">查询</el-button>
        </div>
        <div class="query-param">
          <el-button type="primary" size="small" @click="addConstant">添加变量</el-button>
        </div>
      </div>
    </div>
    <div ref="centerMain" class="center">
      <el-table ref="userTable" border :data="tableData" style="height: 100%">
        <el-table-column fixed type="index" width="50" label="序号" />
        <el-table-column fixed prop="code" label="代码" width="150" />
        <el-table-column fixed prop="name" label="名称" width="150" />
        <el-table-column prop="explanation" label="介绍" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button type="success" size="small" @click="getConstantData(scope.row.id)">查看常量值</el-button>
            <el-button type="primary" size="small" @click="exitConstantData(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleted(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog v-model="addConstantVisible" :title="addConstantTable" width="500px">
    <el-form ref="ruleForm" :model="constantData" label-width="100px">
      <div>
        <el-form-item label="code" prop="name">
          <el-input v-model="constantData.code" size="large" />
        </el-form-item>
        <el-form-item label="变量名称" prop="name">
          <el-input v-model="constantData.name" size="large" />
        </el-form-item>
        <el-form-item label="变量介绍" prop="name">
          <el-input v-model="constantData.explanation" size="large" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addConstantVisible = false">取消</el-button>
        <el-button type="primary" @click="addConstantSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addConstantDataVisible" :title="addConstantDataTable" width="600px">
    <div ref="queryParamMain" class="query-param-main">
      <div class="query-param-term"></div>
      <div class="query-param-function">
        <div class="query-param">
          <el-button type="primary" size="small" @click="addConstantData">添加值</el-button>
        </div>
      </div>
    </div>
    <el-table ref="userTable" border :data="constantDataList" style="height: 100%">
      <!--            <el-table-column fixed type="index" width="50" label="序号"/>-->
      <el-table-column fixed prop="value" label="值" width="150" />
      <el-table-column prop="label" label="介绍" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="exitData(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addConstantDataVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addData" :title="addDataTable" width="500px">
    <el-form ref="ruleForm" :model="addDataForm" label-width="100px">
      <div>
        <el-form-item label="值(整数)" prop="name">
          <el-input v-model="addDataForm.value" size="large" />
        </el-form-item>
        <el-form-item label="解释" prop="name">
          <el-input v-model="addDataForm.label" size="large" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addData = false">取消</el-button>
        <el-button type="primary" @click="addDataSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { post } from '../../../../http/http';
import { API } from '../../../../http/interface/api';
import { ElMessage } from 'element-plus';

const queryParam = ref({
  name: '',
});
const tableData = ref([]);
const addConstantVisible = ref(false);
const addConstantTable = ref('添加常量');
const constantData = ref<any>({ name: '' });
const addConstantDataVisible = ref(false);
const addConstantDataTable = ref('查看变量情况');
const constantDataList = ref([]);

const addData = ref(false); //添加变量值框
const addDataTable = ref('添加变量值');
const addDataForm = ref<any>({
  value: '',
  label: '',
  constantId: '',
});
const currentConstantValue = ref();

onMounted(() => {
  getList();
});

const getList = () => {
  post(API.selectConstantList, queryParam).then((res: any) => {
    if (res.code === 0) {
      tableData.value = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加常量
const addConstant = () => {
  addConstantVisible.value = true;
  addConstantTable.value = '添加常量';
  constantData.value = {};
}; //添加变量提交
const addConstantSubmit = () => {
  post(API.addConstant, constantData).then((res: any) => {
    if (res.code === 0) {
      ElMessage.success(res.msg);
      //刷新列表
      addConstantVisible.value = false;
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  });
}; //删除整个变量
const deleted = (id: string) => {
  post(API.deleteConstant, { id: id }).then((res: any) => {
    if (res.code === 0) {
      ElMessage.success(res.msg);
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//修改常量值
const exitConstantData = (row: any) => {
  addConstantVisible.value = true;
  addConstantTable.value = '修改常量';
  constantData.value = JSON.parse(JSON.stringify(row));
};
//查看常量值
const getConstantData = (id: string = '') => {
  if (id && !currentConstantValue.value) {
    id = currentConstantValue.value;
  }
  post(API.selectConstantData, { id: id }).then((res: any) => {
    if (res.code === 0) {
      currentConstantValue.value = id;
      constantDataList.value = res.data;
      addConstantDataVisible.value = true;
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//添加变量值
const addConstantData = () => {
  addData.value = true;
  addDataForm.value = {};
  addDataForm.value.constantId = currentConstantValue.value;
};
const addDataSubmit = () => {
  post(API.addConstantData, addDataForm).then((res: any) => {
    if (res.code === 0) {
      getConstantData();
      ElMessage.success(res.msg);
      addData.value = false;
    } else {
      ElMessage.error(res.msg);
    }
  });
};
//修改值
const exitData = (row: any) => {
  addData.value = true;
  addDataTable.value = '修改变量值';
  addDataForm.value = row;
};
const deleteData = (id: string) => {
  post(API.deleteConstantData, { id: id }).then((res: any) => {
    if (res.code === 0) {
      getConstantData();
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
  });
};
</script>

<style scoped></style>
