<template>
  <div>
    <div class="nav-top">
      <div class="logo" @click="$router.push('/')">
        <div class="img" style="background-image: url(http://lc-vwzM34py.cn-n1.lcfile.com/93e2bac101ef97002df9/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112155535.png);"></div>
        <span>设计师活动聚集地</span>
      </div>
      <div id="nav" class="nav">
        <template v-for="(items, $index) in routes">
        <router-link :key="$index" :to="items.path" :class="isIndex ? '' : 'hideBorder'" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
        </template>
      </div>
      <div class="user-in">
        <a>登录</a>
        <a class="btn">注册</a>
      </div>
    </div>
    <div class="nav-secord" v-if="childRoutes.length > 0">
      <template v-for="(items, $index) in childRoutes">
      <router-link :key="$index" :to="items.path" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { routes } from './../router/index'
export default {
  data() {
    return {
      routes,
      childRoutes: [],
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
      this.childRoutes = [];
      let allRoutes = this.$router.options.routes;
      for (let i = 0; i < allRoutes.length; i += 1) {
        if (from.path.indexOf(allRoutes[i].path) != -1 && allRoutes[i].children) {
          this.childRoutes = allRoutes[i].children;
        }
      }
    }
  },
}
</script>

<style lang="scss" scope>
  a {
    text-decoration: none;
    color: rgba(51,51,51,1);
    font-family: PingFang SC Regular;
  }
  .nav-top {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    width: 100%;
    height: 110px;
    background-color: #fff;
    letter-spacing: 2px;
    box-sizing: border-box;
    box-shadow: 0px -34px 49px 9px rgba(236,236,236,1);
    z-index: 1000;
    .logo {
      line-height: 110px;
      cursor: pointer;
      .img {
        display: inline-block;
        margin-right: 16px;
        width: 181px;
        height: 52px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        padding-left: 16px;
        border-left: 1px dotted #EBEBEB;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: rgba(153,153,153,1);
        line-height: 52px;
        letter-spacing: 2px;
        vertical-align: middle;
      }
    }
    .nav {
      width:900px;
      display: flex;
      justify-content: space-between;
      padding-top: 62px;
      a {
        display: inline-block;
        width: 180px;
        font-size: 18px;
        text-align: center;
        transition: color 0.5s;
        border-bottom: 4px solid #fff;
        cursor: pointer;
        &:hover {
          color: #FFCB2B;
        }
        &.router-link-active {
          border-bottom: 4px solid #FFCB2B;
        }
      }
    }
    .user-in {
      width: 223px;
      text-align: right;
      line-height: 110px;
      text-align: right;
      z-index: 1;
      a {
        display: inline-block;
        font-size: 18px;
        cursor: pointer;
        transition: color 0.5s;
        &:hover {
          color: #FFCB2B;
        }
        &.btn {
          margin-left: 49px;
          width: 120px;
          height: 50px;
          line-height: 50px;
          background: #FFCB2B;
          border-radius: 10px;
          text-align: center;
        }
      }
    }
  }
  .nav-secord {
    padding: 10px 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #EBEBEB;
    text-align: center;
    a {
      display: inline-block;
      width: 104px;
      font-size: 18px;
      text-align: center;
      &.router-link-exact-active 
      {
        color: #FFCB2B;
      }
    }
  }
</style>
