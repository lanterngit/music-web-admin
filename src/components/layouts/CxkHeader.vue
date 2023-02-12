<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="!collapse">
        <expand/>
      </el-icon>
      <el-icon v-else>
        <fold/>
      </el-icon>
    </div>
    <div class="logo">{{ musicName }}</div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="user-avator">
          <img src="http://106.55.181.80:8888/img/avatorImages/user.jpg ">
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Expand, Fold} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import mixin from "@/mixins/mixin";
import emitter from "@/utils/emitter";
import {RouterName} from "@/enums";

const {routerManager} = mixin()

const musicName = ref('Cxk-Music 后台管理')
const collapse = ref(false)
const username = ref("admin")

onMounted(() => {
  if (document.body.clientWidth < 1500)
    collapseChange()
})

/**
 * @description 侧边栏折叠
 */
function collapseChange() {
  collapse.value = !collapse.value;
  emitter.emit("collapse", collapse.value);
}

/**
 * @description 用户名下拉菜单选择事件
 * @param command {string}
 */
function handleCommand(command: string) {
  if (command === "logout") {
    routerManager(RouterName.SignIn, {path: RouterName.SignIn});
  }
}

</script>

<style scoped lang="less">
.header{
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #2c3e50;
  background: #ffff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
  .collapse-btn{
    display: flex;
    padding: 0 21px;
    cursor: pointer;
  }
  .logo{
    width: 250px;
    font-weight: bold;
  }
  .header-right{
    position: absolute;
    right: 0;
    padding: 30px;
    .header-user-con{
      display: flex;
      align-items: center;
      .user-avator img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .user-name{
        margin-left: 10px;
        line-height: 40px;
        .el-dropdown-link{
          cursor: pointer;
        }
      }
    }
  }
}
</style>