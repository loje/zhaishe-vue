<template>
  <div class="max-width">
    <div class="swiper-box" style="margin-top: 20px;">
      <div class="box-left">
        <swiper :options="leftSwiperOption" ref="leftSwiper">
          <template v-for="(item, $index) in bannerOneList">
          <swiper-slide :key="$index">
            <div class="img" :style="{backgroundImage:`url(${item})`}"></div>
          </swiper-slide>
          </template>
        </swiper>
      </div>
      <div class="box-right">
        <swiper :options="rightSwiperOption" ref="rightSwiper">
          <template v-for="(item, $index) in bannerTwoList">
          <swiper-slide :key="$index">
            <div class="img" :style="{backgroundImage:`url(${item})`}"></div>
          </swiper-slide>
          </template>
        </swiper>
      </div>
    </div>

    <div class="layer">
      <div class="title">
        <span>工具推荐</span>
        <a>MORE</a>
      </div>
      <div class="layer-box">
        <div class="box-1">
          <div class="box" v-for="(item, $index) in recommendList" :key="$index" :style="{backgroundImage:`url(${item.src})`, boxShadow: $index === 0 ? '-12px 0px 0px #F2F1F1' : $index === 2 ? '12px 0px 0px #F2F1F1' : 'none'}"></div>
        </div>
        <div class="box-2">
          <div class="box box-col-2">
            <div class="box-title">
              <span>宅设活动</span>
              <a>MORE</a>
            </div>
            <div class="media-list">
              <template v-for="(item, $index) in activityList">
                <div class="media" :key="$index" v-if="$index < 4">
                  <div class="media-left">
                    <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
                  </div>
                  <div class="media-mid">
                    <div class="media-title">{{item.title}}</div>
                    <div class="media-desc">{{item.desc}}</div>
                  </div>
                  <div class="media-right">
                    <a class="btn">查看</a>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="box">
            <div class="box-title">
              <span>免费下载</span>
              <a>MORE</a>
            </div>
            <div class="title-list">
              <template v-for="(item, $index) in downloadList">
                <div class="t" :key="$index">{{item.title}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="layer">
      <div class="title">
        <span>宅设严选人</span>
      </div>
      <div class="people-box">
        <template v-for="(item, $index) in designerList">
        <div class="box" :key="$index" :style="{backgroundImage: `url(${item.src})`}"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import './../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      leftSwiperOption: {
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
      rightSwiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true,
        loop : true,
        delay: 1000,
        direction : 'vertical',
        slidesPerView : 2,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      bannerOneList: [],
      bannerTwoList: [],

      recommendList: [],
      activityList: [],
      downloadList: [],
      designerList: [],
    }
  },
  computed: {
    swiper() {
      return this.$refs.leftSwiper.swiper;
    }
  },
  mounted() {
    // var TestObject = this.$AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.set('words', 'Hello world!');
    // testObject.save().then(function (testObject) {
    //   console.log(testObject + '保存成功。')
    // })

    this.getBanner();
    this.getRecommend();
    this.getActivity();
    this.getDownload();
    this.getDesigner();
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    getBanner() {
      let that = this;
      var query = new this.$AV.Query('banner');
      let aa = [];
      let bb = [];

      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          console.log(res[i].attributes);
          aa = res[0].attributes.imgList;
          bb = res[1].attributes.imgList;
        }
        that.bannerOneList = aa;
        that.bannerTwoList = bb;

      });
    },
    getRecommend() {
      let that = this;
      var query = new this.$AV.Query('product');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({id: res[i].attributes.id, src: res[i].attributes.img.attributes.url});
        }
        that.recommendList = arr;
      });
    },
    getActivity() {
      let that = this;
      var query = new this.$AV.Query('activity');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
            title: res[i].attributes.title,
            desc: res[i].attributes.desc,
          });
        }
        that.activityList = arr;
      });
    },
    getDownload() {
      let that = this;
      var query = new this.$AV.Query('download');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            title: res[i].attributes.title,
          });
        }
        that.downloadList = arr;
      });
    },
    getDesigner() {
      let that = this;
      var query = new this.$AV.Query('designer');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
          });
        }
        that.designerList = arr;
      });
    },
  },
}
</script>

<style lang="scss" scope>
  .swiper-box {
    display: flex;
    width: 100%;
    height: 380px;
    border-radius: 10px;
    overflow: hidden;
    .box-left {
      width: 761px;
      height: 100%;
      background-color: #707A81;
      background-position: 50%;
      background-size: cover;
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
    .box-right {
      width: 443px;
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
  }
  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
  .layer {
    margin-top: 42px;
    .title {
      margin-bottom: 22px;
      padding-left: 42px;
      padding-right: 16px;
      span {
        font-size: 24px;
        letter-spacing: 2px;
      }
      a {
        float: right;
        display: block;
        width: 83px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        color: #333;
        border-radius: 10px;
        cursor: pointer;
        font-family: PingFang SC Regular;
      }
    }
    .layer-box {
      .box {
        width: 396px;
        height: 211px;
        margin-bottom: 12px;
        background-color: #fff;
        border-radius: 10px;
      }
      .box-1 {
        display: flex;
        justify-content: space-between;
      }
      .box-2 {
        display: flex;
        justify-content: space-between;
        .box {
          padding: 52px 52px 52px 42px;
          height: 659px;
          box-sizing: border-box;
          .box-title {
            margin-bottom: 60px;
            letter-spacing: 2px;
            span {
              font-size: 24px;
            }
            a {
              float: right;
              font-size: 14px;
            }
          }
          .title-list {
            .t {
              margin-bottom: 15px;
              font-size: 18px;
              font-family: PingFang SC Regular;
              color: rgba(51,51,51,1);
            }
          }
        }
        .box-col-2 {
          width: 797px;
          height: 659px;
          .media-list {
            .media {
              display: flex;
              margin-bottom: 20px;
              width: 100%;
              align-items: center;
              .media-left {
                .img {
                  width: 102px;
                  height: 102px;
                  background-position: 50%;
                  background-size: cover;
                  border-radius: 10px; 
                }
              }
              .media-mid {
                flex: 1;
                padding: 0 14px;
                .media-title {
                  margin-bottom: 9px;
                  font-size: 14px;
                  font-family: PingFang SC Regular;
                  color: rgba(51,51,51,1);
                }
                .media-desc {
                  font-size: 18px;
                  font-family: PingFang SC Regular;
                  color: rgba(51,51,51,1);
                }
              }
              .media-right {
                .btn {
                  display: block;
                  width: 110px;
                  height: 40px;
                  line-height: 40px;
                  background: rgba(227,190,76,1);
                  font-size: 18px;
                  font-family: PingFang SC Regular;
                  color: rgba(51,51,51,1);
                  border-radius: 10px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
    .people-box {
      margin-bottom: 87px;
      display: flex;
      justify-content: space-between;
      .box {
        width: 278px;
        height: 349px;
        background-color: #fff;
        border-radius: 10px;
        background-position: 50%;
        background-size: cover;
      }
    }
  }
</style>
