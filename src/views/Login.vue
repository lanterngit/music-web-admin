<template>
  <div class="login-container">
    <div class="login-title">{{ musicName }}</div>
    <div class="login">
      <el-form :model="loginForm" :rules="rules" class="demo-ruleForm">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" type="text" autocomplete="off"/>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" autocomplete="off" @keyup.enter="submitForm"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import api from "@/api";
import mixin from "@/mixins/mixin";
import {RouterName} from "@/enums";

const {proxy} = getCurrentInstance()
const {routerManager} = mixin()

const musicName = ref("Cxk-music 后台管理")

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{required: true, message: "请输入用户名", trigger: "blur"}],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
})

async function submitForm() {
  const res = (await api.getLoginStatus(loginForm)) as ResponseBody
  (proxy as any).$message({
    message: res.message,
    type: res.type
  })
  console.log(res.success)
  if (res.success) routerManager(RouterName.Info, {path: RouterName.Info})
}

</script>

<style scoped lang="less">
.login-container {
  position: relative;
  background: url("../assets/images/background.jpg") fixed center;
  background-size: cover;
  width: 100%;
  height: 100%;

  .login-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
}

</style>