<script setup>
import { ref } from "vue";
// const show = ref(false);

const box = ref(null);

const handleFadeIn = () => {
  box.value.className = "box animate__animated animate__fadeIn";
};

const handleFadeOut = () => {
  box.value.className = "box animate__animated animate__fadeOut";
};
</script>

<template>
  <div class="hello">
    <div class="box" ref="box">盒子</div>
    <button @click="handleFadeIn">淡入</button>
    <button @click="handleFadeOut">淡出</button>
    <!-- 可以添加 delay 类来延迟动画的播放。 -->
    <div class="animated slideInLeft delay-{1-5}">asfj;asjdfajsdf;lj</div>
    <!-- 我们还可以通过添加如下列出的类之一来控制动画速度。 -->
    <div class="animated slideInLeft slow|slower|fast|faster">sadfasdfasdf</div>
  </div>
</template>
<!--
<template>
  <div>
    <button @click="show = !show">切换动画效果</button>
    animate__animated 指定使用 animate.css 中的动画效果
    <transition
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <div v-show="show">
        当自定义变量show为true时显示（从最小不断变大到原始大小），为false时不断变小直到隐藏
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__bounce">
      <div v-show="show" style="margin-top: 50px">
        当自定义变量show为true时显示（从最小不断变大到原始大小），为false时不断变小直到隐藏
      </div>
    </transition>
  </div>
</template>

<style lang="scss"></style> -->

<!-- <script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    handleFadeIn() {
      // this.$refs.box.className = 'box animated fadeIn'; // 这是3.x以下版本的使用方式
      this.$refs.box.className = "box animate__animated animate__fadeIn"; // 这是4.0以上版本的使用方式
    },
    handleFadeOut() {
      // this.$refs.box.className = 'box animated fadeOut'; // 这是3.x以下版本的使用方式
      this.$refs.box.className = "box animate__animated animate__fadeOut"; // 这是4.0以上版本的使用方式
    },
  },
};
</script> -->

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>
