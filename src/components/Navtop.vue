<template>
  <div class="nav-bar">
    <div class="max-width">
      <div class="nav-top">
        <div class="logo" @click="$router.push('/')">
          <div class="img" style="background-image: url(http://lc-vwzM34py.cn-n1.lcfile.com/19531447caa4df280314/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191208223730.png);"></div>
        </div>
        <div id="nav" class="nav">
          <template v-for="(items, $index) in routes">
          <router-link :key="$index" :to="items.path" :class="isIndex ? '' : 'hideBorder'" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
          </template>
        </div>
        <div class="user-in" v-if="!$store.state.user">
          <a @click="showLogin = true"><i class="iconfont">&#xe651;</i>登录</a> |
          <a @click="toRegister">注册</a>
        </div>
        <div class="user" v-else>
          <div class="user-head" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
          <div class="hello">hi，{{$store.state.user.name}}</div>
          <div class="link" @click="logout">退出</div>
        </div>
      </div>
    </div>
    <transition name="fade">
    <Login v-show="showLogin" :status="loginStatus" @close-login="closeLogin"></Login>
    </transition>
  </div>
</template>

<script>
import { routes } from './../router/index'
import Login from './Login'

export default {
  data() {
    return {
      routes: routes[0].children,
      isIndex: false,
      showLogin: false,
      loginStatus: 'login',
    }
  },
  components: {
    Login,
  },
  watch: {
    $route(from) {
      if (from.name === '首页') {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
    }
  },
  methods: {
    closeLogin(i) {
      console.log(i);
      this.showLogin = false;
    },
    toRegister() {
      this.showLogin = true;
      this.loginStatus = 'register';
    },
    logout() {
      this.$Bmob.User.logout();
      const userInfo = localStorage.getItem('bmob');
      if (!userInfo) {
        this.$store.dispatch('getUser', '');
      }
      // localStorage.removeItem('bmob');
    },
  },
}
</script>

<style lang="scss" scope>
  a {
    text-decoration: none;
    color: #000;
    font-family: PingFang SC Regular;
  }
  .nav-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0px -34px 49px 9px #bbb;
    z-index: 2;
    .max-width {
      margin: auto;
      height: 100%;
      .nav-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        letter-spacing: 2px;
        box-sizing: border-box;
        z-index: 1000;
        .logo {
          line-height: 50px;
          cursor: pointer;
          .img {
            display: inline-block;
            margin-right: 16px;
            width: 110px;
            height: 40px;
            background-position: 50%;
            background-size: contain;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
        .nav {
          display: flex;
          justify-content: space-between;
          line-height: 50px;
          a {
            display: inline-block;
            margin: 0 25px;
            width: 70px;
            font-size: 12px;
            text-align: center;
            transition: color 0.5s;
            border-bottom: 4px solid #fff;
            cursor: pointer;
            &:hover {
              color: #FFCB2B;
            }
            &.router-link-exact-active {
              color: #FFCB2B;
              border-bottom: 4px solid #FFCB2B;
            }
          }
        }
        .user-in {
          text-align: right;
          line-height: 50px;
          color: #F2F2F2;
          z-index: 1;
          a {
            display: inline-block;
            font-size: 12px;
            cursor: pointer;
            transition: color 0.5s;
            i {
              font-size: 12px;
            }
            &:hover {
              color: #FFCB2B;
            }
            &.btn {
              margin-left: 30px;
              width: 100px;
              height: 40px;
              line-height: 40px;
              background: #FFCB2B;
              border-radius: 10px;
              text-align: center;
              &:hover {
                color: #333;
              }
            }
          }
        }
        .user {
          font-size: 12px;
          line-height: 50px;
          .user-head {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-size: cover;
          }
          .hello {
            display: inline-block;
            margin-right: 15px;
            vertical-align: middle;
            color:#F4751D;
          }
          .link {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
          }
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
  }
</style>
