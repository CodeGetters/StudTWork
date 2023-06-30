<!--
 * @Description-en:Login Page
 * @Description-zh:登录页
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-30 21:47:33
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
        <!-- <router-link to="/">
          <button class="button">首页</button>
        </router-link>

        <div>{{ theme.isDark }}</div>
        <button @click="changTheme()">切换主题</button> -->
        <button @click="changTheme()">切换主题</button>
        <div class="logo-con">
          <div class="logo-box">
            <div class="logo">
              <img src="@/assets/logo.svg" alt="logo" />
            </div>
            <div class="logo-English">StudTWork</div>
          </div>
          <div class="logo-des">学 生 用 功 团 队 协 作</div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="12" class="login-right">
        <!-- <div class="login">{{ data }}数据</div>
        <div class="login">{{ fetData }}</div>
        <div class="login">{{ getRouter1 }}</div> -->
        <div class="login-form-container">
          <h1>登录</h1>
          <div class="login-form-right-con">
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
              <router-link to="" class="forget-pwd">
                <span>忘记密码</span>
              </router-link>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form>
            <div class="other-platform-login">
              <el-divider content-position="center">其他登陆方式</el-divider>
              <div class="icon-group">
                <div class="icon"></div>
              </div>
              <div class="go-register">
                没有账号， <router-link to="">去注册</router-link>
              </div>
            </div>
          </div>
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
  background: var(--loginPage-bgc);

  .login-form {
    width: 67%;
    height: 74%;
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-bottom: 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 15px 15px 4px -5px var(--form-bgc-box-shadow);

    .login-left {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--form-left-bgc);

      .logo-con {
        height: 23%;
        width: 52%;
        display: flex;
        flex-direction: column;
        user-select: none;

        .logo-box {
          height: 66%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          margin-bottom: 8%;

          .logo {
            width: 31%;
            height: 100%;
            margin-right: 2%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .logo-English {
            width: 67%;
            font-size: 28px;
            font-style: italic;
            letter-spacing: 2.8px;
            margin: auto;

            // 线性渐变
            background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: var(--form-left-logo-textColor);
          }
        }
        .logo-des {
          font-size: 20px;
          text-align: center;
          color: #3a7ecd;
        }
      }
    }
    .login-right {
      height: 100%;
      width: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      background-color: var(--form-right-bgc);

      .login-form-container {
        width: 76%;
        height: 76%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          color: var(--from-right-textColor);
          text-align: center;
          margin: 0;
          font-size: 25px;
          padding-bottom: 3%;
        }
        .login-form-right-con {
          height: 90%;

          :deep(.login-user-info) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 64%;
            margin-bottom: 3%;

            .forget-pwd {
              display: flex;
              height: 7%;
              margin: 2% 0;
              font-size: 12px;
              align-items: center;
              justify-content: flex-end;
              color: var(--from-right-textColor);
            }

            .el-form-item {
              margin: 0;
            }

            .el-form-item--feedback {
              flex-direction: column;

              label.el-form-item__label {
                color: var(--from-right-textColor);
                font-size: 16px;
                display: flex;
                justify-content: flex-start;
              }

              .el-form-item__content {
                min-height: 40px;
              }
            }

            .el-form-item--feedback:first-child {
              margin-bottom: 3%;
            }

            .el-button--primary {
              height: 20%;
              border-radius: 50px;
            }
          }
          :deep(.other-platform-login) {
            height: 33%;
            display: flex;
            flex-direction: column;

            .el-divider__text {
              font-size: 12px;
              color: var(--from-right-textColor);
              background-color: var(--form-right-textBgc);
            }

            .el-divider--horizontal {
              margin: 2%;
            }

            .icon-group {
              height: 30%;
              margin: 8% 0;
              display: flex;
              flex-direction: row;
              background-color: red;
            }

            .go-register {
              color: var(--from-right-textColor);
              text-align: center;
              font-size: 10px;
            }
          }
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
    margin-top: 4%;
    margin-bottom: 2%;
    user-select: none;
    color: var(--footer-textColor);
  }

  a {
    color: var(--footer-textColor);
    text-decoration: none;
    outline: none;
  }
}
.button {
  color: red;
}
</style>
