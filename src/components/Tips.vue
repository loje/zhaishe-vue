<template>
  <transition name="fade">
  <div class="tips-layer" v-if="tips !==''">
    <div :class="tipsType? `${tipsType} tips`:'tips' ">{{tips}}</div>
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
    tipsType: {
      type: [String],
      default() {
        return 'info';
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .tips-layer {
    position: fixed;
    left: 0;
    top: 50px;
    width: 100%;
    text-align: center;
    z-index: 10000;
    .tips {
      padding: 15px 0;
      font-size: 14px;
      color: #fff;
      &.info {
        background-color: rgba(0,0,0,0.75);
      }
      &.warning {
        background-color: rgba(0,0,0,0.75);
      }
      &.error {
        background-color: rgba(255, 0, 24, 0.75);
      }
      &.success {
        background-color: rgba(0, 194, 80,0.75);
      }
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
