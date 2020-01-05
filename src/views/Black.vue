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
  width: 100%;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
}
</style>