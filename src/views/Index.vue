<template>
  <div class="max-width">
    <div class="swiper-box" style="margin-top: 20px;">
      <div class="box-left">
        <loading v-if="bannerLoading"></loading>
        <swiper v-else :options="leftSwiperOption" ref="leftSwiper">
          <template v-for="(item, $index) in bannerLeft">
          <swiper-slide :key="$index">
            <div class="img" :style="{backgroundImage:`url(${item.imgSrc})`}">
              <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
            </div>
          </swiper-slide>
          </template>
        </swiper>
      </div>
      <div class="box-right">
        <loading v-if="bannerLoading"></loading>
        <swiper v-else :options="rightSwiperOption" ref="rightSwiper">
          <template v-for="(item, $index) in bannerRight">
          <swiper-slide :key="$index">
            <div class="img" :style="{backgroundImage:`url(${item.imgSrc})`}">
              <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
            </div>
          </swiper-slide>
          </template>
        </swiper>
      </div>
    </div>

    <div class="layer">
      <template v-if="this.recommendList.length > 0">
      <div class="title">
        <span>宅设好物</span>
        <a @click="$router.push('/tools')">MORE</a>
      </div>
      </template>
      <div class="layer-box">
        <template v-if="this.recommendList.length > 0">
        <loading v-if="recommendLoading"></loading>
        <swiper v-else :options="toolOption" ref="toolsSwiper">
          <template v-for="(item, $index) in recommendList">
          <swiper-slide :key="$index" >
            <div class="img" :style="{backgroundImage:`url(${item.src})`}"></div>
          </swiper-slide>
          </template>
        </swiper>
        </template>
        <div class="box-2">
          <div class="box col-2">
            <div class="box-title">
              <span>宅设活动</span>
              <a @click="$router.push('/activity')">MORE</a>
            </div>
            <div class="media-list">
              <loading v-if="activityLoading"></loading>
              <template v-else v-for="(item, $index) in activityList">
                <div class="media" :key="$index" v-if="$index < 4">
                  <div class="media-left">
                    <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
                  </div>
                  <div class="media-mid">
                    <div class="media-title">{{item.title}}</div>
                    <div class="media-desc">{{item.desc}}</div>
                  </div>
                  <div class="media-right">
                    <a class="btn disabled" v-if="item.status === 0" @click="toActivity(item.id)">查看</a>
                    <a class="btn" v-else-if="item.status === 1" @click="toActivity(item.id)">查看</a>
                    <a class="btn disabled" v-else-if="item.status === 2" @click="toActivity(item.id)">查看</a>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="box col-1">
            <div class="box-title">
              <span>更多资源</span>
              <a @click="$router.push('/download')">MORE</a>
            </div>
            <loading v-if="downloadLoading"></loading>
            <div class="title-list" v-else>
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
      <loading v-if="designerLoading"></loading>
      <div class="people-box" v-else>
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
import loading from './../components/Loading';
import './../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    loading,
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
        loop : true,
        delay: 1000,
        slidesPerView: 3,
        spaceBetween: 8,
      },
      bannerLeft: [],
      bannerRight: [],
      bannerLoading: false,

      recommendList: [],
      recommendLoading: false,

      activityList: [],
      activityLoading: false,

      downloadList: [],
      downloadLoading: false,

      designerList: [],
      designerLoading: false,
    }
  },
  computed: {
    swiper() {
      return this.$refs.leftSwiper.swiper;
    }
  },
  mounted() {
    this.getActivity();
    this.getBanner();
    this.getRecommend();
    this.getDownload();
    this.getDesigner();
  },
  methods: {
    getBanner() {
      var query = this.$Bmob.Query('banner');
      let bannerLeft = [];
      let bannerRight = [];
      this.bannerLoading = true;
      query.find().then((res) => {
        this.bannerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          if (res[i].position && res[i].position === 'left') {
            bannerLeft.push({
              id: res[i].id,
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            });
          }
          if (res[i].position && res[i].position === 'right') {
            bannerRight.push({
              id: res[i].objectId,
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            });
          }
        }
        this.bannerLeft = bannerLeft;
        this.bannerRight = bannerRight;
      });
    },
    getRecommend() {
      var query = this.$Bmob.Query('product');
      let arr = [];
      this.recommendLoading = true;
      query.equalTo('recommend', '===', true);
      query.equalTo('status', '===', 0);
      query.equalTo('notDelete', '===', true);
      query.find().then((res) => {
        this.recommendLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({id: res[i].objectId, src: res[i].imgSrc});
        }
        this.recommendList = arr;
      });
    },
    getActivity() {
      var query = this.$Bmob.Query('activity');

      let arr = [];
      query.order('-endTime');
      query.equalTo('isTop', '==', true);
      query.equalTo('notDelete', '==', true);
      this.activityLoading = true;
      query.find().then((res) => {
        this.activityLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            title: res[i].title,
            src: res[i].imgSrc,
            desc: res[i].desc,
            status: res[i].status,
          });
        }
        this.activityList = arr;
      });
    },
    getDownload() {
      var query = this.$Bmob.Query('download');
      let arr = [];
      this.designerLoading = true;
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            title: res[i].title,
            downloads: res[i].downloads,
          });
        }
        this.downloadList = arr;
      });
    },
    getDesigner() {
      var query = this.$Bmob.Query('designer');
      let arr = [];
      this.designerLoading = true;
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            src: res[i].img,
            name: res[i].name,
          });
        }
        this.designerList = arr;
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
    height: 340px;
    border-radius: 10px;
    overflow: hidden;
    .box-left {
      width: 760px;
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
          .link {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .box-right {
      width: 440px;
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
        line-height: 40px;
      }
      a {
        float: right;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        color: #333;
        border-radius: 10px;
        cursor: pointer;
        font-family: PingFang SC Regular;
        font-size: 16px;
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
        margin-bottom: 8px;
        background-color: #fff;
        border-radius: 10px;
      }

      .swiper-container{
        margin-bottom: 8px;
        width: 100%;
        height: 210px;
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
          padding: 30px;
          height: 600px;
          box-sizing: border-box;
          .box-title {
            margin-bottom: 50px;
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
            width: 100%;
            .t {
              position: relative;
              padding-right: 30px;
              width: 100%;
              margin-bottom: 20px;
              font-size: 16px;
              font-family: PingFang SC Regular;
              color: #666;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
              box-sizing: border-box;
              span {
                position: absolute;
                right: 0;
                top:0;
              }
            }
          }
        }
        .col-1 {
          margin-left: 8px;
          width: 33.3%;
        }
        .col-2 {
          width: 66.6%;
          height: 600px;
          .media-list {
            position: relative;
            .media {
              display: flex;
              margin-bottom: 15px;
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
                width: 400px;
                .media-title {
                  font-size: 18px;
                  font-family: PingFang SC Regular;
                  color: #333;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .media-desc {
                  margin-top: 9px;
                  font-size: 14px;
                  font-family: PingFang SC Regular;
                  color: #666;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
              }
              .media-right {
                flex: 1;
                text-align:right;
                .btn {
                  display: inline-block;
                  width: 100px;
                  height: 40px;
                  line-height: 40px;
                  background: #FFCB2B;
                  font-size: 16px;
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
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      .box {
        width: 270px;
        .img {
          width: 100%;
          height: 350px;
          background-color: #fff;
          border-radius: 10px;
          background-position: 50%;
          background-size: cover;
        }
        .name {
          margin-top: 15px;
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: #333;
        }
      }
    }
  }
</style>
