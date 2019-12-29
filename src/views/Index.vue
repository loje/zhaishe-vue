<template>
  <div>
    <div class="max-width">
      <div class="swiper-box">
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
        <div class="layer-flex">
          <div class="layer-title">
            <div class="icon" style="background-image: url('http://files.zdesigner.cn/2019/12/28/e7eaec524071ce948069035ac5b91ff7.png');background-size: cover;"></div>
            <div class="title">Eagle素材包</div>
            <div class="more">···</div>
          </div>
          <div class="layer-list">
            <div class="list-item" v-for="(item, $index) in downloadList" :key="$index">
              <div class="icon" :style="{'background-image': `url(${item.imgSrc})`}"></div>
              <div class="title">{{item.title}}</div>
              <div class="item-right">{{item.author}}</div>
            </div>
          </div>
        </div>
        <div class="layer-flex">
          <div class="layer-title">
            <div class="icon"></div>
            <div class="title">设计师工具</div>
            <div class="more">···</div>
          </div>
          <div class="layer-block">
            <div class="block-item" v-for="(item, $index) in recommendList" :key="$index">
              <div class="icon" :style="{'background-image': `url(${item.imgSrc})`}"></div>
              <div class="title">{{item.title}}</div>
            </div>
            <div class="block-item more-item">
              <div class="icon">加入宅设</div>
              <div class="title">其他</div>
            </div>
          </div>
        </div>
        <div class="layer-flex">
          <div class="layer-title">
            <div class="icon"></div>
            <div class="title">私单墙</div>
            <div class="more">···</div>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-layer">
      <div class="max-width">
        <div class="layer-title">
          <div class="title">宅设分享会</div>
          <div class="layer-nav">
            <div class="nav active">宅社主办</div>
            <div class="nav">其他活动</div>
          </div>
          <div class="pages">
            <div class="prev">上一页</div>
            <div class="page-list">
              <div class="page">1</div>
              <div class="page">2</div>
              <div class="page">3</div>
              <div class="page more">···</div>
              <div class="page">10</div>
            </div>
            <div class="prev">下一页</div>
          </div>
        </div>

        <div class="activity-list">
          <div class="the-activity" v-for="(item, $index) in activityList" :key="$index">
            <div class="activity-left">
              <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
            </div>
            <div class="activity-mid">
              <div class="title">{{item.title}}</div>
              <div class="desc">{{item.desc}}</div>
              <div class="tag"></div>
            </div>
            <div class="activity-right">
              <div class="btn">查看活动</div>
              <div class="price">￥60 ~ ￥120</div>
              <div class="toggle" @click="toggle($index)">查看分享人</div>
            </div>
            <div class="speaker-list" v-show="item.toggleStatus === true">
              <div class="speaker">
                <div class="img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="designer-layer">
      <div class="max-width">
        <div class="layer-title">
          <div class="title">宅设分享人<span>宅设大咖组</span></div>
          <div class="more">···</div>
        </div>
        <div class="people-box">
          <loading v-if="designerLoading"></loading>
          <swiper v-else :options="designerSwiperOption" ref="designerSwiper">
            <template v-for="(item, $index) in designerList">
            <swiper-slide :key="$index">
            <div class="box">
              <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
              <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="title">
                  <span>title1</span>
                  <span>title2</span>
                </div>
                <div class="btn">个人链接</div>
                <div class="get">找他接单</div>
              </div>
            </div>
            </swiper-slide>
            </template>
          </swiper>
        </div>
      </div>
    </div>
    <div class="btm-bannner">
      <img src="../assets/img/btm_tips.png" />
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
        spaceBetween : 20,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      // toolOption: {
      //   loop : true,
      //   delay: 1000,
      //   slidesPerView: 3,
      //   spaceBetween: 8,
      // },
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

      designerSwiperOption: {
        autoplay: true,
        loop : true,
        delay: 1000,
        slidesPerView: 5,
        spaceBetween: 40,
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.leftSwiper.swiper;
    }
  },
  mounted() {
    this.getDesigner();
    this.getActivity();
    this.getBanner();
    this.getRecommend();
    this.getDownload();
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
          arr.push({
            id: res[i].objectId,
            title: res[i].title,
            imgSrc: res[i].imgSrc
          });
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
            imgSrc: res[i].imgSrc,
            desc: res[i].desc,
            status: res[i].status,
            toggleStatus: false,
          });
        }
        this.activityList = arr;
      });
    },
    getDownload() {
      var query = this.$Bmob.Query('download');
      let arr = [];
      this.designerLoading = true;
      query.equalTo('notDelete', '===', true);
      query.equalTo('isTop', '===', true);
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          let sort = this.$Bmob.Query('download_sort');
          sort.get(res[i].sort).then((s) => {
            if (s.name === 'Eagle分类素材包') {
              arr.push({
                id: res[i].objectId,
                title: res[i].title,
                sort: s.name,
                imgSrc: res[i].imgSrc,
                author: res[i].author,
              });
            }
          });
        }
        this.downloadList = arr;
      });
    },
    getDesigner() {
      var query = this.$Bmob.Query('designer');
      let arr = [];
      this.designerLoading = true;
      query.equalTo('isTop', '===', true);
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
    toggle(i) {
      for (let x = 0; x < this.activityList.length; x += 1) {
        if (x !== i) {
          this.activityList[x].toggleStatus = false;
        }
      }
      this.activityList[i].toggleStatus = !this.activityList[i].toggleStatus;
    },
  },
}
</script>

<style lang="scss" scope>
  .swiper-box {
    display: flex;
    margin-top: 30px;
    margin-bottom: 40px;
    width: 100%;
    height: 340px;
    overflow: hidden;
    .box-left {
      padding-right: 20px;
      width: 700px;
      height: 100%;
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
      width: 400px;
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
    display: flex;
    width: 100%;
    margin-bottom: 40px;
    justify-content: space-between;
    .layer-flex {
      padding: 20px;
      height: 260px;
      width: 350px;
      background-color: #fff;
      overflow: hidden;
      box-sizing: border-box;
      .layer-title {
        position: relative;
        margin-bottom: 20px;
        padding-right: 50px;
        width: 100%;
        height: 22px;
        box-sizing: border-box;
        .icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          background-color: #ccc;
          border-radius: 50%;
          vertical-align: middle;
        }
        .title {
          display: inline-block;
          margin-left: 10px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 22px;
          vertical-align: middle;
        }
        .more {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #F2F2F2;
          letter-spacing: 2px;
          color: #F4C51D;
          font-size: 24px;
          border-radius: 2px;
          transition: all ease 0.25s;
          cursor: pointer;
          &:hover {
            border-color: #F4C51D;
            background-color: rgba(244,197,29,0.3);
          }
        }
      }
      .layer-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        .list-item {
          position: relative;
          display: flex;
          margin-bottom: 13px;
          align-items: center;
          width: 100%;
          font-size: 12px;
          line-height: 20px;
          cursor: pointer;
          .icon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-position: 50%;
            background-size: cover;
          }
          .title {
            flex: 1;
            padding-left: 5px;
            height: 20px;
            color: #888;
          }
          .item-right {
            width: 80px;
            text-align: right;
            color: #888;
          }
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            .title {
              color: #F4C51D;
            }
            .item-right {
              color: #F4C51D;
            }
          }
        }
      }

      .layer-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .block-item {
          margin-bottom: 10px;
          width: 33.33%;
          height: 90px;
          .icon {
            margin: auto;
            width: 50px;
            height: 50px;
            background-position: 50%;
            background-size: cover;
          }
          .title {
            margin-top: 10px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }

          &.more-item {
            .icon {
              display: flex;
              align-items: center;
              padding: 0 10px;
              border: 2px solid #F2F2F2;
              box-sizing: border-box;
              font-size: 12px;
              color: #888;
            }
          }
        }
      }
    }
  }

  .activity-layer {
    background-color: #fff;
    .max-width {
      margin: auto;
      .layer-title {
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #F2F2F2;
        box-sizing: border-box;
        .title {
          padding-left: 10px;
          width: 280px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 50px;
          vertical-align: middle;
        }
        .layer-nav {
          flex: 1;
          display: flex;
          .nav {
            margin: 0 30px;
            height: 50px;
            line-height: 50px;
            border-bottom: 4px solid transparent;
            box-sizing: border-box;
            cursor: pointer;
            &:hover, &.active {
              color: #F4C51D;
              border-bottom: 4px solid #F4C51D;
            }
          }
        }
        .pages {
          .prev {
            display: inline-block;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            font-size: 12px;
            color: #888;
            cursor: pointer;
          }
          .page-list {
            display: inline-block;
            vertical-align: middle;
            .page {
              display: inline-block;
              width: 34px;
              height: 50px;
              line-height: 50px;
              vertical-align: middle;
              text-align: center;
              cursor: pointer;
              font-weight: bold;
              transition: all ease 0.25s;
              &.more {
                color: #D8D8D8;
                font-weight: normal;
                letter-spacing: 4px;
              }
              &:hover {
                background-color: #F4C51D;
                color: #000;
              }
            }
          }
          .next {
            display: inline-block;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            font-size: 12px;
            color: #888;
            cursor: pointer;
          }
        }
      }

      .activity-list {
        .the-activity {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 50px;
          width: 100%;
          &:last-child {
            margin-bottom: 0;
          }
          .activity-left {
            width: 280px;
            height: 160px;
            .img {
              width: 280px;
              height: 160px;
              background-color: #888;
              border-radius: 3px;
              background-position: 50%;
              background-size: cover;
            }
          }
          .activity-mid {
            flex: 1;
            padding: 0 30px;
            box-sizing: border-box;
            .title {
              margin-bottom: 10px;
              font-size: 20px;
              font-family: PingFangSC;
              font-weight: 600;
              color: #262626;
              line-height: 32px;
            }
            .desc {
              font-size: 14px;
              color: #888;
              line-height: 24px;
            }
          }
          .activity-right {
            position: relative;
            width: 120px;
            height: 160px;
            text-align: right;
            .btn {
              display: inline-block;
              width: 100px;
              height: 40px;
              line-height: 38px;
              text-align: center;
              cursor: pointer;
              border-radius: 3px;
              border: 2px solid #F4C51D;
              box-sizing: border-box;
              font-size: 14px;
              font-weight: bold;
              color: #262626;
              &:hover {
                background-color: rgba(244,197,29,0.30);
              }
            }
            .price {
              margin-top: 10px;
              font-size: 16px;
              font-family: PingFangSC;
              font-weight: 600;
              color: rgba(244,117,29,1);
              line-height: 22px;
            }
            .toggle {
              position: absolute;
              right: 0;
              bottom: 0;
              color: #2B2B2B;
              font-size: 12px;
              cursor: pointer;
            }
          }
          .speaker-list {
            display: none;
            margin-top: 20px;
            width: 100%;
            background-color: #FCFCFC;
            .speaker {
              padding: 19px 30px;
              .img {
                width: 80px;
                height: 80px;
              }
            }
          }
        }
      }
    }
  }

  .designer-layer {
    padding-top: 50px;
    padding-bottom: 30px;
    background-color: #fff;
    .max-width {
      margin: auto;
      .layer-title {
        position: relative;
        margin-bottom: 20px;
        padding-right: 50px;
        width: 100%;
        height: 22px;
        box-sizing: border-box;
        .title {
          display: inline-block;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 22px;
          vertical-align: middle;
          span {
            margin-left: 20px;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(136,136,136,1);
            line-height: 20px;
          }
        }
        .more {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #F2F2F2;
          letter-spacing: 2px;
          color: #F4C51D;
          font-size: 24px;
          border-radius: 2px;
          transition: all ease 0.25s;
          cursor: pointer;
          &:hover {
            border-color: #F4C51D;
            background-color: rgba(244,197,29,0.3);
          }
        }
      }
      .people-box {
        width: 100%;
        .box {
          position: relative;
          width: 100%;
          height: 340px;
          border: 1px solid #D8D8D8;
          overflow: hidden;
          box-sizing: border-box;
          .img {
            position: relative;
            width: 100%;
            height: 230px;
            background-color: #fff;
            background-position: 50%;
            background-size: cover;
            z-index: 0;
          }
          .info {
            position: absolute;
            left: 0;
            bottom: -150px;
            padding: 25px 15px 15px 15px;
            width: 100%;
            height: 260px;
            background-color: #fff;
            box-sizing: border-box;
            transition: all ease-in-out 0.25s;
            &:hover {
              bottom: 0px;
            }
            .name {
              font-size: 16px;
              line-height: 20px;
              font-family: PingFang SC Regular;
              color: #383838;
            }
            .title {
              margin-top: 20px;
              color: #888;
              font-size: 12px;
              line-height: 17px;
              span {
                margin-top: 3px;
                display: block;
                &:first-child {
                  margin-top: 0;
                }
              }
            }
            .btn {
              display: block;
              margin-top: 40px;
              width: 66px;
              height: 25px;
              line-height: 25px;
              text-align: center;
              color: #333;
              font-size: 12px;
              text-align: center;
              border-radius: 2px;
              background-color: #F4C51D;
              cursor: pointer;
            }
            .get {
              margin-top: 50px;
              font-size: 16px;
              font-family: PingFangSC;
              font-weight: bold;
              color: rgba(51,51,51,1);
              line-height: 22px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .btm-bannner {
    width: 100%;
    background-image: url(../assets/img/btm_tips.png);
    background-position: 50%;
    background-color: #fff;
    img {
      display: block;
      margin: auto;
      max-width: 100%;
    }
  }
</style>
