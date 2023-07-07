<script setup>
import { ref } from "vue";
import {
  Setting,
  Odometer,
  Menu,
  Operation,
  User,
  Fold,
  Expand,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);

import { useRouter } from "vue-router";
const router = useRouter();

const routerJump = (url, param) => {
  router.push({
    path: url,
    query: param,
  });
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<template>
  <div id="LeftMenu">
    <el-menu
      default-active="1"
      class="menuCon"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#165DFF"
    >
      <el-menu-item index="1" @click="routerJump('/home', {})">
        <el-icon><Odometer /></el-icon>
        <template #title>{{ $t("layout.homePage") }}</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>分析看板</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>工作台</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>{{ $t("layout.controlCenter") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="routerJump('/userManage', {})">{{
            $t("layout.userManage")
          }}</el-menu-item>
          <el-menu-item index="4-2" @click="routerJump('/articleManage', {})">{{
            $t("layout.articleManage")
          }}</el-menu-item>
          <el-menu-item index="4-3" @click="routerJump('/commentManage', {})">{{
            $t("layout.commentManage")
          }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="5" @click="routerJump('/userCenter', {})">
        <el-icon><User /></el-icon>
        <template #title>{{ $t("layout.userCenter") }}</template>
      </el-menu-item>
    </el-menu>
    <button class="isOpen" @click="isCollapse = !isCollapse">
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </button>
  </div>
</template>

<style lang="less">
#LeftMenu {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-menu {
    height: 90%;
    padding: 3.3% 3.6%;

    .el-menu-item {
      border-radius: 2px;
    }
  }

  .menuCon:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .is-active {
    background-color: #f2f3f5;
  }

  .isOpen {
    height: 5%;
    outline: none;
    border: none;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10%;
  }
}
</style>
