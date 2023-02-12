<template>
  <el-breadcrumb class="crumbs" separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name" :to="{ path: item.path, query: item.query }">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>

  <div class="container">
    <div class="handle-box">
      <el-button @click="deleteAll">批量删除</el-button>
      <el-input v-model="searchWord" placeholder="筛选关键词"></el-input>
    </div>
    <el-table height="550px" border size="small" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="用户" width="80"></el-table-column>
      <el-table-column prop="content" label="评论内容"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template v-slot="scope">
          <el-button type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 删除提示框 -->
  <cxk-del-dialog :delVisible="delVisible" @confirm="confirm" @cancelRow="delVisible = $event"></cxk-del-dialog>
</template>

<script lang="ts" setup>
import { getCurrentInstance, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import  api  from "@/api";
import CxkDelDialog from "@/components/dialog/CxkDelDialog.vue";

const { proxy } = getCurrentInstance();
const store = useStore();

const tableData = ref([]); // 记录歌曲，用于显示
const tempDate = ref([]); // 记录歌曲，用于搜索时能临时记录一份歌曲列表
const breadcrumbList = computed(() => store.getters.breadcrumbList);

const searchWord = ref(""); // 记录输入框输入的内容
watch(searchWord, () => {
  if (searchWord.value === "") {
    tableData.value = tempDate.value;
  } else {
    tableData.value = [];
    for (let item of tempDate.value) {
      if (item.username.includes(searchWord.value)) {
        tableData.value.push(item);
      }
    }
  }
});

getData();

// 获取评论
function getData() {
  tableData.value = [];
  tempDate.value = [];
  let promise = null;
  if (proxy.$route.query.type == "0") {
    promise = api.getCommentOfSongId(proxy.$route.query.id);
  } else if (proxy.$route.query.type == "1") {
    promise = api.getCommentOfSongListId(proxy.$route.query.id);
  }

  promise.then((res) => {
    for (let item of (res as ResponseBody).data) {
      getUsers(item.userId, item);
    }
  });
}
async function getUsers(id, item) {
  const result = (await api.getUserOfId(id)) as ResponseBody;
  item.username = result.data[0].username;
  tableData.value.push(item);
  tempDate.value.push(item);
}

/**
 * 删除
 */
const idx = ref(-1); // 记录当前要删除的行
const multipleSelection = ref([]); // 记录当前要删除的列表
const delVisible = ref(false); // 显示删除框

async function confirm() {
  const result = (await api.deleteComment(idx.value)) as ResponseBody;
  (proxy as any).$message({
    message: result.message,
    type: result.type,
  });

  if (result.success) getData();
  delVisible.value = false;
}
function deleteRow(id) {
  idx.value = id;
  delVisible.value = true;
}
function handleSelectionChange(val) {
  multipleSelection.value = val;
}
function deleteAll() {
  for (let item of multipleSelection.value) {
    deleteRow(item.id);
    confirm();
  }
  multipleSelection.value = [];
}

</script>

<style scoped>

</style>