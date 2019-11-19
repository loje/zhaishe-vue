<template>
  <div>
  <div class="max-width">
    <div class="banner">
      <swiper :options="swiperOption" ref="bannerSwiper">
        <template v-for="(item, $index) in banner">
        <swiper-slide :key="$index">
          <div class="img" :style="{backgroundImage:`url(${item})`}"></div>
        </swiper-slide>
        </template>
      </swiper>
    </div>
    <div class="activity-title">活动信息</div>
    <div class="activity-detail">
      <div class="info">
        <p>主题：{{title}}</p>
        <p>时间：{{time}}</p>
        <p>地点：{{address}}</p>
        <p>费用：{{fee}}</p>
        <a class="btn">会后笔记</a>
      </div>
      <article v-html="content"></article>
    </div>
  </div>
  <div class="price-layer">
    <div class="max-width">
      <div class="pv">浏览量：2018</div>
      <div class="fee">费用：<span>50</span>元</div>
      <a>报名</a>
    </div>
  </div>
  </div>
</template>
<script>
import './../../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      banner: [],
      title: '',
      time: '',
      address: '',
      fee: '',
      content: '',
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true,
        loop : true,
        delay: 1000,
        pagination: {
          el: '.swiper-pagination',
        }
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.bannerSwiper.swiper;
    }
  },
  mounted() {
    const that = this;
    var query = new this.$AV.Query('activity');
    query.equalTo('id', this.$route.query.id);
    query.find().then(function (res) {
      that.banner = res[0].attributes.banner || [];
      that.title = res[0].attributes.title || '';
      that.time = res[0].attributes.time || '';
      that.address = res[0].attributes.address || '';
      that.fee = res[0].attributes.fee || '';
      that.content = res[0].attributes.content || '';
    });
  },
};
</script>
<style lang="scss" scope>
  .banner {
    margin-top: 20px;
    width: 100%;
    height: 426px;
    border-radius: 10px;
    background-color: #E3BE4C;
    overflow: hidden;
    .swiper-container{
      width: 100%;
      height: 100%;
      .img {
        width: 100%;
        height: 100%;
        background-position: 50%;
        background-size: cover;
      }
    }
  }
  .activity-title {
    margin-left: 25px;
    margin-top: 33px;
    font-size: 18px;
    font-family: PingFang SC Regular;
    color: rgba(51,51,51,1);
  }
  .activity-detail {
    margin-top: 20px;
    padding: 71px 133px 61px 133px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    .info {
      position: relative;
      .btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 147px;
        height: 40px;
        line-height: 40px;
        background: rgba(227,190,76,1);
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: rgba(255,255,255,1);
      }
    }
    article {
      width: 100%;
      box-sizing: border-box;
      > img {
        max-width: 100%;
      }
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
      }
    }
  }
</style>
