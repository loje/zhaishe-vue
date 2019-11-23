<template>
  <div class="max-width">
    <div class="swiper-box" style="margin-top: 20px;">
      <div class="box-left">
        <swiper v-if="bannerOneList.length > 0" :options="leftSwiperOption" ref="leftSwiper">
          <template v-for="(item, $index) in bannerOneList">
          <swiper-slide :key="$index">
            <div class="img" :style="{backgroundImage:`url(${item})`}"></div>
          </swiper-slide>
          </template>
        </swiper>
      </div>
      <div class="box-right">
        <swiper v-if="bannerTwoList.length > 0" :options="rightSwiperOption" ref="rightSwiper">
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
        <span>宅设好物</span>
        <a @click="$router.push('/tools')">MORE</a>
      </div>
      <div class="layer-box">
        <swiper v-if="recommendList.length > 0" :options="toolOption" ref="toolsSwiper">
          <template v-for="(item, $index) in recommendList">
          <swiper-slide :key="$index" >
            <div class="img" :style="{backgroundImage:`url(${item.src})`}"></div>
          </swiper-slide>
          </template>
        </swiper>
        <div class="box-2">
          <div class="box box-col-2">
            <div class="box-title">
              <span>宅设活动</span>
              <a @click="$router.push('/activity')">MORE</a>
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
                    <a class="btn" v-if="item.status === 0" @click="toActivity(item.id)">报名</a>
                    <a class="btn disabled" v-else-if="item.status === 1" @click="toActivity(item.id)">已报名</a>
                    <a class="btn disabled" v-else-if="item.status === 2" @click="toActivity(item.id)">结束</a>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="box">
            <div class="box-title">
              <span>更多资源</span>
              <a @click="$router.push('/download')">MORE</a>
            </div>
            <div class="title-list">
              <template v-for="(item, $index) in downloadList">
                <div class="t" :key="$index">
                {{item.title}} <span>{{item.downloads}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="layer">
      <div class="title">
        <span>宅设严选人</span>
        <a @click="$router.push('/designer')">MORE</a>
      </div>
      <div class="people-box">
        <template v-for="(item, $index) in designerList">
        <div class="box" :key="$index">
          <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
          <div class="name">{{item.name}}</div>
        </div>
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
        autoplay: true,
        loop : true,
        delay: 1000,
        direction : 'vertical',
        slidesPerView : 2,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      toolOption: {
        // autoplay: true,
        loop : true,
        delay: 1000,
        slidesPerView: 3,
        // slidesPerGroup: 3,
        spaceBetween: 8,
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
    this.getBanner();
    this.getRecommend();
    this.getActivity();
    this.getDownload();
    this.getDesigner();
  },
  methods: {
    getBanner() {
      let that = this;
      var query = new this.$AV.Query('banner');
      let aa = [];
      let bb = [];

      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
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
            status: res[i].attributes.status,
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
            downloads: res[i].attributes.downloads,
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
            name: res[i].attributes.name,
          });
        }
        that.designerList = arr;
      });
    },
    toActivity(id) {
      this.$router.push({
        path: '/activity/item',
        query: { id },
      })
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
    margin-top: 31px;
    .title {
      margin-bottom: 22px;
      padding-left: 34px;
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 24px;
        line-height: 50px;
      }
      a {
        float: right;
        display: inline-block;
        vertical-align: middle;
        width: 120px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #fff;
        color: #333;
        border-radius: 10px;
        cursor: pointer;
        font-family: PingFang SC Regular;
        transition: background-color 0.5s;
        &:hover {
          background-color: #FFCB2B;
        }
      }
    }
    .layer-box {
      width: 100%;
      .box {
        width: 396px;
        margin-bottom: 12px;
        background-color: #fff;
        border-radius: 10px;
      }

      .swiper-container{
        margin-bottom: 12px;
        width: 100%;
        height: 211px;
        .img {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: cover;
          border-radius: 10px;
        }
      }
      .box-2 {
        display: flex;
        justify-content: space-between;
        .box {
          margin-bottom: 0;
          padding: 52px 32px 52px 42px;
          height: 659px;
          box-sizing: border-box;
          .box-title {
            margin-bottom: 60px;
            span {
              font-size: 24px;
              line-height: 24px;
            }
            a {
              float: right;
              font-size: 14px;
              transition: color 0.5s;
              line-height: 24px;
              cursor: pointer;
              &:hover {
                color: #FFCB2B;
              }
            }
          }
          .title-list {
            .t {
              margin-bottom: 30px;
              font-size: 18px;
              font-family: PingFang SC Regular;
              color: #666;
              span {
                float: right;
              }
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
                margin-left: 28px;
                width: 350px;
                .media-title {
                  margin-bottom: 9px;
                  font-size: 14px;
                  font-family: PingFang SC Regular;
                  color: #666;
                }
                .media-desc {
                  font-size: 18px;
                  font-family: PingFang SC Regular;
                  color: #333;
                }
              }
              .media-right {
                flex: 1;
                text-align:right;
                .btn {
                  display: inline-block;
                  width: 120px;
                  height: 50px;
                  line-height: 50px;
                  background: #FFCB2B;
                  font-size: 18px;
                  font-family: PingFang SC Regular;
                  color: #333;
                  border-radius: 10px;
                  text-align: center;
                  cursor: pointer;
                  &.disabled {
                    background: #EBEBEB;
                  }
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
        .img {
          width: 100%;
          height: 349px;
          background-color: #fff;
          border-radius: 10px;
          background-position: 50%;
          background-size: cover;
        }
        .name {
          margin-top: 16px;
          text-align: center;
          font-size: 18px;
          font-family: PingFang SC Regular;
          color: #333;
        }
      }
    }
  }
</style>
