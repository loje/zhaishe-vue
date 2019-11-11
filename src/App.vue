<template>
  <div id="app">
    <Navtop></Navtop>
    <router-view/>
  </div>
</template>

<script>
import Navtop from './components/Navtop';

export default {
  components: {
    Navtop,
  },
}
</script>
