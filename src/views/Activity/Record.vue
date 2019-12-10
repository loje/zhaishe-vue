<template>
<div>
  <div class="record-layer max-width">
    <div class="bread-crumbs">
      <a @click="$router.back(-1)">返回内容</a> / <span>活动笔记</span>
    </div>
    <article v-html="content"></article>
  </div>

  <div class="price-layer">
    <div class="max-width">
      <div class="pv">浏览量：2018</div>
      <div class="like-num">点赞数：201</div>
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
  mounted() {
    this.loading = true;
    var query = new this.$AV.Query('activity');

    query.get(this.$route.query.id).then((res) => {
      this.content = res.get('note') || '';
    });
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
    box-sizing: border-box;
    .bread-crumbs {
      margin-bottom: 55px;
      font-size: 16px;
      font-family: PingFang SC Regular;
      a {
        margin-right: 10px;
        color: #FFCB2B;
        cursor: pointer;
      }
      span {
        margin-left: 10px;
        color: #333;
      }
    }
    article {
      width: 100%;
      min-height: 1445px;
    }
  }

  .price-layer {
    margin-bottom: 2px;
    width: 100%;
    height: 89px;
    background-color: #fff;
    box-shadow: 0px 38px 79px 0px rgba(42,38,43,0.07);
    .max-width {
      height: 100%;
      line-height: 89px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFang SC Regular;
      color: #333;
      text-align: right;
      .pv {
        display: inline-block;
        margin-right: 70px;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
      }
      .like-num {
        display: inline-block;
        margin-right: 70px;
        vertical-align: middle;
        height: 40px;
        line-height: 40px;
        span {
          font-size: 18px;
        }
      }
      a {
        display: inline-block;
        vertical-align: middle;
        width: 147px;
        height: 40px;
        line-height: 40px;
        background-color: #EBEBEB;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  
</style>

<style>
p {
  width: 100%;
}
p img {
  max-width: 100%;
}
</style>