import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/main.css';
// @ is an alias to /src

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import './assets/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
