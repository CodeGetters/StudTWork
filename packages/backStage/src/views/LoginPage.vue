<!--
 * @Description-en:Login Page
 * @Description-zh:登录页
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-06 23:31:49
-->
<script setup>
import { ref, onMounted } from "vue";
import i18n from "@/i18n";
import { changeTheme, recallTheme } from "@/utils/index";
import { postLogin } from "@/api/user";
import { useRouter } from "vue-router";
import useAuthStore from "../store/auth";

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // 首次渲染获取用户设置的主题
  recallTheme();
});

// TODO:语言切换持久全局化
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

/**
 * @description 语言切换
 */
const changeLang = () => {
  locale.value === "zh-cn"
    ? (locale.value = "en-us")
    : (locale.value = "zh-cn");
};

const isRight = ref({
  account: false,
  pwd: false,
});

// 表单
const ruleForm = ref({
  account: "",
  pass: "",
});

const ruleFormRef = ref();

/**
 * @description 用户名或邮箱校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkAccount = (rule, value, callback) => {
  let usernameReg = /^(?=.*[a-zA-Z]).{4,11}$/;
  let emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
  if (value === "") {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    if (usernameReg.test(value) || emailReg.test(value)) {
      if (!ruleFormRef.value) return;
      isRight.value.account = true;
      callback();
    }
    callback(new Error(i18n.global.t("loginPage.accountVerify")));
  }
};

/**
 * @description 密码校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkPass = (rule, value, callback) => {
  let passReg = /^(?=.*[a-zA-Z])(?=.*\d).{4,11}$/;
  if (value === "") {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    if (passReg.test(value)) {
      if (!ruleFormRef.value) return;
      isRight.value.pwd = true;
      callback();
    }
    callback(new Error(i18n.global.t("loginPage.pwdVerify")));
  }
};

// 校验规则配置
const rules = ref({
  account: [
    {
      required: true,
      trigger: "blur",
      validator: checkAccount,
    },
  ],
  pass: [
    {
      required: true,
      trigger: "blur",
      validator: checkPass,
    },
  ],
});

/**
 * @description 登录
 */
const submitForm = async () => {
  if (isRight.value.account && isRight.value.pwd) {
    const userName = ruleForm.value.account;
    const pwd = ruleForm.value.pass;
    isRight.value = {
      userName,
      pwd,
    };
    // 调用登录接口
    await postLogin(isRight)
      .then((res) => {
        notification("success");
        // token 持久化
        authStore.setToken(JSON.stringify(res.data.token));
        router.push({
          path: "/home",
        });
      })
      .catch((err) => {
        notification(err, err.response.data.msg);
      });
  } else {
    notification("error");
  }
};

/**
 * @description 登录结果提示
 * @param {*} type 弹出类型 err ? success
 * @param {*} msg 失败信息
 */
const notification = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElNotification({
    title: "消息提示",
    message: type === "success" ? `欢迎回来 ${ruleForm.value.account}` : msg,
    type,
  });
};

// console.log("mode：", import.meta.env.MODE);
</script>

<template>
  <div id="loginPage">
    <button @click="changeTheme()">切换主题</button>

    <button @click="changeLang()">切换语言</button>
    <el-row class="login-form">
      <el-col :xs="0" :sm="0" :md="12" :lg="12" class="login-left">
        <div class="logo-con">
          <div class="logo-box">
            <div class="logo">
              <img src="@/assets/logo.svg" alt="logo" />
            </div>
            <div class="logo-English">StudTWork</div>
          </div>
          <div class="logo-des">{{ $t("loginPage.logoDesc") }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="login-right">
        <div class="login-form-container">
          <h1>{{ $t("loginPage.loginTitle") }}</h1>
          <div class="login-form-right-con">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="100px"
              class="login-user-info"
            >
              <el-form-item :label="$t('loginPage.account')" prop="account">
                <el-input
                  type="account"
                  v-model="ruleForm.account"
                  autocomplete="off"
                  :placeholder="$t('loginPage.accountIpt')"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('loginPage.password')" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  :placeholder="$t('loginPage.passwordIpt')"
                ></el-input>
              </el-form-item>
              <router-link to="" class="forget-pwd">
                <span>{{ $t("loginPage.forgetPwd") }}</span>
              </router-link>
              <el-button type="primary" @click="submitForm('ruleForm')">{{
                $t("loginPage.loginForm")
              }}</el-button>
            </el-form>

            <div class="other-platform-login">
              <el-divider content-position="center">{{
                $t("loginPage.otherPlatform")
              }}</el-divider>
              <div class="icon-group">
                <div class="icon"></div>
              </div>
              <div class="go-register">
                {{ $t("loginPage.noAccount") }}，
                <router-link to="">{{ $t("loginPage.register") }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <div>
        <a href="javascript:;"
          ><span>{{ $t("loginPage.privateCon") }}</span></a
        >
        |
        <a href="javascript:;"
          ><span>{{ $t("loginPage.policyAgree") }}</span></a
        >
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
  min-width: 375px;
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
        margin: auto;
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
            margin-bottom: 4%;

            .forget-pwd {
              display: flex;
              height: 7%;
              margin: 3.5%;
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
                min-height: 30px;

                .el-form-item__error {
                  font-size: 10px;
                }
              }
            }

            .el-form-item--feedback:first-child {
              margin-bottom: 8%;
            }

            .el-button--primary {
              height: 14%;
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
</style>
