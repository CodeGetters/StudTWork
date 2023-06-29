<!--
 * @Description-en:Login Page
 * @Description-zh:登录页
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-28 17:58:59
-->
<script setup>
import { ref, onMounted } from "vue";

import { fetchData, getHome, getRouter } from "@/api/login";

const data = ref(null);
const fetData = ref(null);
const getRouter1 = ref(null);

onMounted(() => {
  fetchData(fetData);
  getHome(data);
  getRouter(getRouter1);
});

console.log("mode：", import.meta.env.MODE);

import { changTheme } from "@/utils/index";

import useThemeStore from "../store/theme";

const theme = useThemeStore();

// 表单
const ruleForm = ref({
  account: "",
  pass: "",
});

const rules = () => {
  account: [{ validator: validateAccount, trigger: "blur" }];
  pass: [{ validator: validatePass, trigger: "blur" }];
};

// 账号验证
let validateAccount = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    if (ruleForm.checkPass !== "") {
      ruleForm.validateField("checkAccount");
    }
    callback();
  }
};

// 密码验证
let validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      ruleForm.validateField("checkPass");
    }
    callback();
  }
};

const submitForm = (formName) => {
  // this.$refs[formName].validate((valid) => {
  // if (valid) {
  // alert("submit!");
  // } else {
  // console.log("error submit!!");
  // return false;
  // }
  // });

  console.log(formName.validator);
};

// const submitForm = computed((formName) => {
//   formName.validate((valid) => {
//     if (valid) {
//       alert("submit!");
//     } else {
//       console.log("error submit!!");
//       return false;
//     }
//   });
// });
</script>

<template>
  <div id="loginPage">
    <el-row class="login-form">
      <el-col :xs="0" :sm="6" :md="12" :lg="12" class="login-left">
        <router-link to="/">
          <button class="button">首页</button>
        </router-link>

        <div>{{ theme.isDark }}</div>
        <button @click="changTheme()">切换主题</button>
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="12" class="login-right">
        <!-- <div class="login">{{ data }}数据</div>
        <div class="login">{{ fetData }}</div>
        <div class="login">{{ getRouter1 }}</div> -->
        <div class="login-form-container">
          <h1>登录</h1>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="login-user-info"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                type="account"
                v-model="ruleForm.account"
                autocomplete="off"
                placeholder="请输入用户名/手机号/邮箱号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <div>
        <a href="javascript:;"><span>隐私内容</span></a> |
        <a href="javascript:;"><span>政策协议</span></a>
      </div>
      <div>
        Copyright © 2023
        <a href="javascript:;">
          <span>JohnsonXin</span>
        </a>
        &
        <a href="javascript:;">
          <span>泽泽</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#loginPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--bgc);

  .login-form {
    width: 67%;
    height: 74%;
    margin: auto;
    margin-bottom: 0;
    border-radius: 10px;
    overflow: hidden;

    .login-left {
      width: 100%;
      background-color: var(--form-left-bgc);
    }
    .login-right {
      width: 100%;
      background-color: var(--form-right-bgc);

      .login-form-container {
        width: 76%;
        height: 78%;
        margin: auto;
        padding: 11% 12%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: goldenrod;

        h1 {
          padding-bottom: 7%;
        }

        .login-user-info {
          width: 100%;
        }
      }

      .login {
        color: var(--textColor);
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5.2%;
    margin-bottom: 30px;
    user-select: none;
    color: #007fdf;
  }

  a {
    color: #007fdf;
    text-decoration: none;
    outline: none;
  }
}
.button {
  color: red;
}
</style>
