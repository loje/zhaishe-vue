<template>
  <div class="black">
    <keep-alive>
      <router-view v-bind="$attrs" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-bind="$attrs" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scope>
.black {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 361px);
  overflow-x: hidden;
  z-index: 0;
}
</style>