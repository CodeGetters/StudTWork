<script setup>
const avatarGroup = [
  {
    src: "/src/assets/layout/search.svg",
    onPress: () => {},
  },
  {
    src: "src/assets/layout/translate.svg",
    onPress: () => {},
  },
  {
    src: "src/assets/layout/notification.svg",
    onPress: () => {},
  },
  {
    src: "src/assets/layout/theme.svg",
    onPress: () => {},
  },
  {
    src: "src/assets/layout/setting.svg",
    onPress: () => {},
  },
  {
    src: "src/assets/layout/motif.svg",
    onPress: () => {},
  },
  {
    src: "/src/assets/layout/avatar.png",
    onPress: () => {},
  },
];
</script>

<template>
  <div id="TopNavbar">
    <el-row>
      <el-col :xs="8" :sm="4" :md="4" :lg="6" class="left">
        <div class="logoBox">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="logo" />
          </div>
          <div class="logoDesc">StudTWork</div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="8" :md="10" :lg="12" />
      <el-col :xs="16" :sm="12" :md="10" :lg="6" class="right">
        <div class="avatarGroup">
          <div
            class="icon"
            v-for="item in avatarGroup"
            :key="item"
            @click="avatarGroup.onPress"
          >
            <img :src="item.src" alt="" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<!-- 1920 / 24 = 80 -->
<style lang="less">
#TopNavbar {
  height: 5.5%;

  .el-row {
    width: 100%;
    height: 100%;
    background-color: var(--navbar-bgc);
    // 480
    .left {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;

      .logoBox {
        width: 30%;
        height: 58.3%;
        margin-left: 3.3%;
        margin-right: 67%;
        display: flex;
        flex-direction: row;
        align-items: center;

        .logo {
          width: 31.5%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .logoDesc {
          font-size: 16px;
          font-weight: 800;
          font-style: italic;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: var(--form-left-logo-textColor);
        }
      }
    }

    .center {
      width: 100%;
      height: 100%;
    }

    // 640
    .right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .avatarGroup {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-right: 2%;

        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 2.5%;
          background-color: #ccc;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
