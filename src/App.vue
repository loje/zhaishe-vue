<template>
  <div id="app">
    <Navtop></Navtop>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Navtop from './components/Navtop';
import Bottom from './components/Bottom';

export default {
  components: {
    Navtop,
    Bottom,
  },
}
</script>
