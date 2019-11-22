<template>
  <div>
    <template v-if="$route.path !== '/activity/record'">
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
          <a class="btn" @click="toRecord">会后笔记</a>
        </div>
        <article v-html="content"></article>
      </div>
    </div>
    <div class="price-layer">
      <div class="max-width">
        <div class="pv">浏览量：2018</div>
        <div class="fee">费用：<span>50</span>元</div>
        <a @click="apply">报名</a>
      </div>
    </div>

    <div class="dialog" v-if="applyShow">
      <div class="dialog-box">
        <div class="dialog-flex">
          <div class="img" :style="{ backgroundImage: `url(${dialog.img})` }"></div>
          <div class="right">
            <div class="fee">报名费：50元</div>
            <div class="form-group">
              <span>姓名</span>
              <input type="text" />
            </div>
            <div class="form-group">
              <span>电话</span>
              <input type="text" />
            </div>
            <div class="form-group">
              <span>微信</span>
              <input type="text" />
            </div>
            <div class="tips">电话格式错误</div>
          </div>
        </div>
        <a class="btn" @click="putApply">报名</a>
      </div>
      <div class="dialog-bg"></div>
    </div>

    <div class="dialog" v-if="qrcodeShow">
      <div class="dialog-box">
        <div class="qrcode" :style="{ backgroundImage: `url(${dialog.img})` }"></div>
        <div class="text">
          报名成功<br/>24小时内小编会联系您进行支付
        </div>
        <span class="close" @click="qrcodeHide">关闭</span>
      </div>
    </div>
    </template>

    <router-view v-else></router-view>
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
      applyShow: false,
      dialog: {
        img: '',
      },
      qrcodeShow: false
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
    query.equalTo('id', Number(this.$route.query.id));
    query.find().then(function (res) {
      that.banner = res[0].attributes.banner || [];
      that.title = res[0].attributes.title || '';
      that.time = res[0].attributes.time || '';
      that.address = res[0].attributes.address || '';
      that.fee = res[0].attributes.fee || '';
      that.content = res[0].attributes.content || '';
    });
  },
  methods: {
    apply() {
      this.applyShow = true;
    },
    putApply() {
      this.applyShow = false;
      this.qrcodeShow = true;
    },
    qrcodeHide() {
      this.qrcodeShow = false;
    },
    toRecord() {
      this.$router.push('/activity/record');
    },
  },
};
</script>
<style lang="scss" scope>
  .banner {
    margin-top: 20px;
    width: 100%;
    height: 426px;
    border-radius: 10px;
    background-color: #FFCB2B;
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
    color: #333;
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
        background: #FFCB2B;
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: rgba(255,255,255,1);
        cursor: pointer;
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
      color: #333;
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
        background-color: #FFCB2B;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.34);
    z-index: 3;
    .dialog-box {
      position: relative;
      margin: auto;
      padding: 59px 54px 30px 48px;
      background-color: #fff;
      border-radius: 10px;
      z-index: 1;
      .dialog-flex {
        display: inline-flex;
        .img {
          width: 300px;
          height: 300px;
          border-radius: 10px;
          background-color: #E7C352;
        }
        .right {
          padding-left: 57px;
          .fee {
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
          .form-group {
            margin-top: 23px;
            width: 382px;
            span {
              font-size: 18px;
              letter-spacing: 3px;
              font-family: PingFang SC Regular;
              color: #333;
            }
            input {
              margin-left: 9px;
              padding: 0;
              width: 330px;
              height: 47px;
              border: none;
              outline: none;
              border-bottom: 1px solid #DDD;
            }
          }
          .tips {
            margin-top: 27px;
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
        }
      }

      .btn {
        display: block;
        margin: auto;
        margin-top: 46px;
        width: 400px;
        height: 50px;
        line-height: 50px;
        background-color: rgba(241,196,74,1);
        font-family: PingFang SC Regular;
        color: #333;
        text-align: center;
        border-radius: 10px;
      }

      .qrcode {
        width: 340px;
        height: 340px;
      }
      .text {
        text-align: center;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: #333;
        line-height: 24px;
      }
      .close {
        position: absolute;
        right: 47px;
        top: 39px;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: #333;
        cursor: pointer;
        z-index: 2;
      }
    }
    .dialog-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
</style>
