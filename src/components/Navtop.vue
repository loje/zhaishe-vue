<template>
  <div class="nav-top">
    <div class="max-width">
      <div class="logo">
        <div class="img" style="background-image: url(http://lc-vwzM34py.cn-n1.lcfile.com/93e2bac101ef97002df9/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112155535.png);"></div>
        <span>设计师活动聚集地</span>
      </div>
      <div id="nav" class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/tools">工具</router-link>
        <router-link to="/active">活动</router-link>
        <router-link to="/download">下载</router-link>
        <router-link to="/about">关于我们</router-link>
      </div>
    </div>
    <div class="user-in">
      <a>登录</a>
      <a class="btn">注册</a>
    </div>
  </div>
</template>

<script>
export default {
  activated() {
    // console.log(this.$route.matched);
  },
}
</script>

<style lang="scss" scope>
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
        margin-right: 143px;
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
        width:607px;
        display: flex;
        justify-content: space-between;
        padding-top: 62px;
        a {
          display: inline-block;
          width: 104px;
          font-family: PingFang SC Regular;
          font-size: 18px;
          text-decoration: none;
          color: rgba(51,51,51,1);
          text-align: center;
          &.router-link-exact-active {
            border-bottom: 4px solid #E3BE4C;
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
</style>
