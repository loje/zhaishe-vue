<template>
  <div>
    <div class="nav-top">
      <div class="max-width">
        <div class="logo">
          <div class="img" style="background-image: url(http://lc-vwzM34py.cn-n1.lcfile.com/93e2bac101ef97002df9/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112155535.png);"></div>
          <span>设计师活动聚集地</span>
        </div>
        <div id="nav" class="nav">
          <template v-for="(items, $index) in routes">
          <router-link :key="$index" :to="items.path" :class="isIndex ? '' : 'hideBorder'" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
          </template>
        </div>
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
      console.log(from);
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
    position: relative;
    width: 100%;
    height: 110px;
    background-color: #fff;
    letter-spacing: 2px;
    .max-width {
      display: flex;
      height: 100%;
      .logo {
        padding-top: 19px;
        margin-right: 120px;
        width: 181px;
        text-align: center;
        .img {
          margin-bottom: 11px;
          width: 181px;
          height: 52px;
        }
        span {
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: rgba(153,153,153,1);
          line-height: 16px;
          letter-spacing: 2px;
        }
      }
      .nav {
        width:700px;
        display: flex;
        justify-content: space-between;
        padding-top: 62px;
        a {
          display: inline-block;
          width: 104px;
          font-size: 18px;
          text-align: center;
          &.router-link-active {
            border-bottom: 4px solid #E3BE4C;
          }
          &.hideBorder:nth-child(1) {
            border-bottom: none;
          }
        }
      }
    }
    .user-in {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      height: 100%;
      align-items: center;
      padding-right: 60px;
      z-index: 1;
      a {
        font-size: 18px;
        &.btn {
          margin-left: 18px;
          width: 107px;
          height: 40px;
          line-height: 40px;
          background: rgba(227,190,76,1);
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
        color: #E3BE4C;
      }
    }
  }
</style>
