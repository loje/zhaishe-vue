<template>
  <div class="nav-top">
    <div class="max-width">
      <div class="logo">
        <div class="img"></div>
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
  </div>
</template>

<style lang="scss" scope>
  .nav-top {
    width: 100%;
    height: 110px;
    background-color: #fff;
    .max-width {
      display: flex;
      .logo {
        padding-top: 19px;
        margin-right: 143px;
        width: 181px;
        text-align: center;
        .img {
          margin-bottom: 11px;
          width: 181px;
          height: 52px;
          background-color:#eee;
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
          font-family: PingFang SC Regular;
          font-size: 24px;
          text-decoration: none;
          color: rgba(51,51,51,1);
        }
      }
    }
  }
</style>

<script>
export default {
}
</script>