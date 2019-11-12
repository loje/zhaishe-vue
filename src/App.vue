<template>
  <div id="app">
    <Navtop></Navtop>
    <router-view/>
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
