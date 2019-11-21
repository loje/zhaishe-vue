<template>
<div>
  <div class="record-layer max-width">
    <div class="bread-crumbs">
      <a>返回内容</a> / <span>活动笔记</span>
    </div>
    <article v-html="content"></article>
  </div>

  <div class="price-layer">
    <div class="max-width">
      <div class="pv">浏览量：2018</div>
      <div class="fee">费用：<span>50</span>元</div>
      <a @click="like">点赞</a>
    </div>
  </div>
</div>

</template>
<script>
export default {
  data() {
    return{
      content: '',
    }
  },
  methods: {
    like() {},
  },
};
</script>
<style lang="scss" scoped>
  .record-layer {
    margin-top: 35px;
    padding: 68px 130px;
    background-color: #fff;
    .bread-crumbs {
      margin-bottom: 55px;
      font-size: 16px;
      font-family: PingFang SC Regular;
      color: rgba(227,190,76,1);
    }
  }

  .price-layer {
    width: 100%;
    height: 89px;
    background-color: #fff;
    box-shadow: 0px 38px 79px 0px rgba(42,38,43,0.07);
    .max-width {
      height: 100%;
      padding-right: 104px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFang SC Regular;
      color: rgba(51,51,51,1);
      text-align: right;
      .pv {
        display: inline-block;
        margin-right: 38px;
        height: 40px;
        line-height: 40px;
        vertical-align: bottom;
      }
      .fee {
        display: inline-block;
        margin-right: 38px;
        vertical-align: bottom;
        height: 40px;
        line-height: 40px;
        span {
          font-size: 18px;
        }
      }
      a {
        display: inline-block;
        vertical-align: bottom;
        width: 147px;
        height: 40px;
        line-height: 40px;
        background-color: rgba(227,190,76,1);
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: rgba(51,51,51,1);
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  
</style>