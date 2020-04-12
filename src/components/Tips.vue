<template>
  <transition name="fade">
  <div class="tips-layer" v-if="tips !==''">
    <div class="tips" :style="{backgroundColor: tipsBackgroundColor ? tipsBackgroundColor : 'rgba(0,0,0,0.75)', color: tipsColor ? tipsColor : '#fff'}">{{tips}}</div>
  </div>
  </transition>
</template>

<script>
export default {
  props: {
    tips: {
      type: [String],
      default() {
        return '';
      },
    },
    tipsBackgroundColor: {
      type: [String],
      default() {
        return '';
      },
    },
    tipsColor: {
      type: [String],
      default() {
        return '';
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .tips-layer {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    padding-top: 5%;
    width: 100%;
    align-items: center;
    z-index: 10000;
    .tips {
      margin :auto;
      padding: 5px;
      border-radius: 6px;
      font-size: 12px;
    }
  }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.25s, transform 0.25s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
      opacity: 0;
      transform: translate(0, -15px);
    }
    .fade-leave, .fade-enter-to {
      transform: translate(0, 0);
    }
</style>
