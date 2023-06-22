<!--
 * @Descripttion:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-19 22:16:29
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-22 21:05:23
-->

<template>
  <!-- 关于路由过渡参照：https://blog.csdn.net/fang_my/article/details/125578420 -->

  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="less">
@import "./styles/common.less";
</style>
