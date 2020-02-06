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

import axios from 'axios'
axios.defaults.baseURL = '/'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const memberInfo = localStorage.getItem('bmob');
  if (memberInfo) {
    store.dispatch('getMember', JSON.parse(memberInfo));
  }
  next();
});

router.afterEach(() => {
  window,scrollTo(0,0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// AppID: wx9a76b368090721eb
// AppSecret: f17b3a8b2b6f23e998b8af0372fd7774


// 生成二维码规则
// const secord = new Date().getTime() / 1000;

// function randomString(length, chars) {
//   var result = '';
//   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//   return result;
// }

// console.log(nonce_str);
// console.log(rString.length);

// appid： wx9a76b368090721eb

// mch_id： 1570704211

// device_info： 1000

// body： test

// nonce_str： ibuaiVcKdpRxkhJA


// `weixin：//wxpay/bizpayurl?sign=XXXXX&appid=wx9a76b368090721eb&mch_id=1570704211&product_id=000001&time_stamp=${secord}&nonce_str=${nonce_str}`