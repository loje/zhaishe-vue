<template>
  <div class="nav-bar">
    <div class="max-width">
      <div class="nav-top">
        <div class="logo" @click="$router.push('/')">
          <div class="img" style="background-image: url(http://lc-vwzM34py.cn-n1.lcfile.com/19531447caa4df280314/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191208223730.png);"></div>
          <!-- <span>设计师活动聚集地</span> -->
        </div>
        <div id="nav" class="nav">
          <template v-for="(items, $index) in routes">
          <router-link :key="$index" :to="items.path" :class="isIndex ? '' : 'hideBorder'" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
          </template>
        </div>
        <div class="user-in">
          <a>登录</a> |
          <a>注册</a>
        </div>
      </div>
      <!-- <div class="nav-secord" v-if="childRoutes.length > 0">
        <template v-for="(items, $index) in childRoutes">
        <router-link :key="$index" :to="items.path" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
        </template>
      </div> -->
    </div>
  </div>
</template>

<script>
import { routes } from './../router/index'
export default {
  data() {
    return {
      routes: routes[0].children,
      // childRoutes: [],
      isIndex: false,
    }
  },
  watch: {
    $route(from) {
      if (from.name === '首页') {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
      // this.childRoutes = [];
      // let allRoutes = this.$router.options.routes;
      // for (let i = 0; i < allRoutes.length; i += 1) {
      //   if (from.path.indexOf(allRoutes[i].path) != -1 && allRoutes[i].children) {
      //     this.childRoutes = allRoutes[i].children;
      //   }
      // }
    }
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
          // span {
          //   display: inline-block;
          //   padding-left: 16px;
          //   border-left: 1px dotted #EBEBEB;
          //   font-size: 16px;
          //   font-family: PingFang SC Regular;
          //   color: rgba(153,153,153,1);
          //   line-height: 50px;
          //   letter-spacing: 2px;
          //   vertical-align: middle;
          // }
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
            &.router-link-active {
              color: #FFCB2B;
              border-bottom: 4px solid #FFCB2B;
            }
          }
        }
        .user-in {
          // padding-top: 40px;
          // text-align: right;
          text-align: right;
          line-height: 50px;
          color: #F2F2F2;
          z-index: 1;
          a {
            display: inline-block;
            font-size: 12px;
            cursor: pointer;
            transition: color 0.5s;
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
      }
      // .nav-secord {
      //   padding: 10px 0;
      //   width: 100%;
      //   background-color: #fff;
      //   border-top: 1px solid #EBEBEB;
      //   text-align: center;
      //   a {
      //     display: inline-block;
      //     margin: 0 45px;
      //     font-size: 18px;
      //     &.router-link-exact-active 
      //     {
      //       color: #FFCB2B;
      //     }
      //   }
      // }
    }
  }
</style>
