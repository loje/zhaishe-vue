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

// var AV = require('leancloud-storage');
// var { Realtime } = require('leancloud-realtime'); // 若不使用即时通讯服务，则无需引入

// AV.init({
//   appId: "vwzM34pywVYeT0lY6G5KlSYM-gzGzoHsz",
//   appKey: "3CTYBXJYIGsSrCGSD11E9p63",
//   serverURLs: "https://api.zdesigner.cn"
// });
// Vue.prototype.$AV = AV;
import Bmob from "hydrogen-js-sdk";
Bmob.initialize("4dcf39d90a4913b4", "900620", "b7bbafa0f02dd8b6d4e93fea9efd96aa");
Vue.prototype.$Bmob = Bmob;

Bmob.debug(false);

import moment from 'moment'
Vue.prototype.$moment = moment

Vue.config.productionTip = false

router.afterEach(() => {
  window,scrollTo(0,0);
  // const $body = document.querySelector('body');
  // if ($body) {
  //   $body.scrollTop = 0; // 设置滚动条重置到顶部
  // }
  // window.addEventListener('scroll', 0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
