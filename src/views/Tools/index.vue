<template>
  <div class="tools-page">
    <div class="max-width">
      <loading v-if="toolsLoading"></loading>
      <swiper v-else :options="toolsSwiperOption" ref="toolsSwiper">
        <template v-for="(item, $index) in toolsSwiperList">
        <swiper-slide :key="$index">
          <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}">
            <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
          </div>
        </swiper-slide>
        </template>
      </swiper>
    </div>

    <div class="the-layout">
      <div class="max-width">
        <div class="layout-left">
          <div class="pages">
            <div class="prev">上一页</div>
            <div class="page-list">
              <div :class="pagePro === item ? 'page active' : 'page'" v-for="item in proPages" :key="item" @click="getProducts(item)">{{item > 3 ? '···' : item}}</div>
            </div>
            <div class="next">下一页</div>
            
            <div class="search-bar">
              <i class="iconfont">&#xe652;</i>
              <input type="text" v-model="keyword" />
              <span @click="getProCount">搜索</span>
            </div>
          </div>

          <div class="tools-list">
            <div class="the-tool" v-for="(item, $index) in productList" :key="$index">
              <div class="tool-left">
                <div class="img" :style="{backgroundImage: `url(${item.imgListSrc})`}"></div>
              </div>
              <div class="tool-middle">
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
              </div>
              <div class="tool-right">
                <router-link class="btn" :to="{path: '/tools/item', query: { id: item.id }}">购买</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-right">
          <div class="right-block" :style="{backgroundImage: `url(${toolsAd.imgSrc})`}">
            <a class="block" :href="toolsAd.link" target="blank" v-if="toolsAd.link"></a>
          </div>
          <div class="right-tips">
            <div class="title">购买需知</div>
            <div class="text">平台可提供优惠购买服务，购买的时请加小编微信：zhaishehui01 </div>
            <div class="text"><span>团购 - </span>我们需要凑满人数才会统一发出，所以不是第一时间拿到，请联系小编，及时跟进</div>
            <div class="text"><span>返利券 - </span>小编会给出返利，可以凭优返利购买，记得找请找小编领取</div>
            <div class="text"><span>无提示 - </span>无优惠，只推荐</div>
          </div>
          <div class="right-link">我有好工具需要曝光</div>

          <div class="wechat-img">
            <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loading from '@/components/Loading';
import '@/assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    loading,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      toolsLoading: false,
      toolsSwiperList: [],
      toolsSwiperOption: {
        autoplay: true,
        loop : true,
        delay: 1000,
        slidesPerView: 3,
        spaceBetween: 30,
      },

      toolsAd: '',

      productList: [],
      proTotal: 0, // 总条数
      proPages: 0, // 总页数
      proLimit: 5, // 每页条数
      productLoading: false,
      skipPro: 0, // 跳过数量
      pagePro: 1, // 当前页数

      keyword: '',
    }
  },
  activated() {
    this.getBanner();
    this.getProCount();
  },
  methods: {
    getBanner() {
      let bannerQuery = this.$Bmob.Query('banner');

      this.toolsLoading = true;
      bannerQuery.find().then((res) => {
        this.toolsLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          if (res[i].position === 'tool') {
            this.toolsSwiperList.push({
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            });
          }
          if (res[i].position === 'toolAd') {
            this.toolsAd = {
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            };
          }
        }
      });
    },

    getProCount() {
      var query = this.$Bmob.Query('product');
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.proTotal = total;
        // this.proPages = parseInt(total / this.proLimit);
        // if (total % this.proLimit > 0) {
        //   this.proPages = this.proPages + 1;
        // }
        this.getProducts(1);
      });
    },
    getProducts(page) {
      console.log(page);
      // if (page) {
      //   if (page > this.proPages) {
      //     this.pagePro = this.proPages;
      //   } else if (page < 0) {
      //     this.pagePro = 1;
      //   } else {
      //     this.pagePro = page;
      //   }
      // } else {
      //   this.pagePro = 1
      // }

      var query = this.$Bmob.Query('product');
      // this.skipPro = this.proLimit * (this.pagePro - 1);

      let arr = [];
      query.order('-endTime');
      query.equalTo('notDelete', '==', true);
      if (this.keyword) {
        query.equalTo("title","===", this.keyword);
      }
      // query.skip(this.skipPro);
      // query.limit(this.proLimit);
      this.productLoading = true;
      query.find().then((res) => {
        this.productLoading = false;
        for (let i = 0; i < res.length; i += 1) {          
          arr.push({
            id: res[i].objectId,
            imgListSrc: res[i].imgListSrc,
            title: res[i].title,
            desc: res[i].desc,
          });
        }
        this.productList = arr;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .tools-page {
    padding-top: 20px;
    .swiper-container {
      width: 100%;
      .swiper-slide {
        display: flex;
        align-items: center;
        width: 360px;
        height: 187px;
        .img {
          width: 352px;
          height: 170px;
          background-position: 50%;
          background-size: cover;
          .link {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        &.swiper-slide-next {
          .img {
            width: 360px;
            height: 187px;
          }
        }
      }
    }

    .the-layout {
      margin-top: 20px;
      padding-bottom: 60px;
      width: 100%;
      background-color: #fff;
      .max-width {
        display: flex;
        .layout-left {
          flex: 1;
          padding-right: 60px;
          box-sizing: border-box;
          .pages {
            position: relative;
            margin-bottom: 20px;
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #F2F2F2;
            text-align: center;
            .prev, .next {
              display: inline-block;
              vertical-align: middle;
              line-height: 50px;
              color: #888;
              font-size: 12px;
            }
            cursor: pointer;
            .page-list {
              display: inline-flex;
              margin: 0 15px;
              line-height: 50px;
              vertical-align: middle;
              .page {
                width: 34px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                font-weight: bold;
                color: #000;
                text-align: center;
                cursor: pointer;
                &:hover, &.active {
                  color: #fff;
                  background-color: #F4C51D;
                }
              }
            }

            .search-bar {
              position: absolute;
              right: 0;
              bottom: 10px;
              display: flex;
              align-items: center;
              width: 170px;
              height: 30px;
              background-color: #FCFCFC;
              i {
                display: inline-block;
                width: 24px;
                line-height: 30px;
                color: #888;
              }
              input {
                padding: 0px 5px;
                width: 110px;
                height: 30px;
                border:none;
                outline: none;
                background-color: transparent;
                box-sizing: border-box;
              }
              span {
                display: inline-block;
                width: 24px;
                text-align: right;
                word-break: keep-all;
                line-height: 30px;
                font-size: 12px;
                color: #888;
                cursor: pointer;
              }
            }
          }

          .tools-list {
            width: 100%;
            .the-tool {
              display: flex;
              margin-bottom: 25px;
              width: 100%;
              height: 110px;
              &:last-child {
                margin-bottom: 0;
              }
              .tool-left {
                width: 190px;
                height: 100%;
                .img {
                  width: 100%;
                  height: 100%;
                  background-position: 50%;
                  background-size: cover;
                  border: 1px solid #D8D8D8;
                  border-radius: 2px;
                  box-sizing: border-box;
                }
              }
              .tool-middle {
                flex: 1;
                padding-top: 15px;
                padding-left: 25px;
                padding-right: 25px;
                box-sizing: border-box;
                .title {
                  font-size: 16px;
                  font-weight: bold;
                  color: #383838;
                  line-height: 22px;
                }
                .desc {
                  margin-top: 10px;
                  font-size: 14px;
                  color: #888;
                  line-height: 24px;
                }
              }
              .tool-right {
                padding-top: 15px;
                width: 100px;
                text-align: center;
                box-sizing: border-box;
                .btn {
                  display: block;
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                  border: 1px solid #F4751D;
                  color: #F4751D;
                  font-size: 14px;
                  border-radius: 2px;
                  box-sizing: border-box;
                  transition: all 250ms ease-in-out;
                  &:hover {
                    background-color: rgba(244,117,29,0.3);
                  }
                }
                .link {
                  display: inline-block;
                  margin-top: 10px;
                  color: #383838;
                  font-size: 12px;
                  line-height: 17px;
                }
              }
            }
          }
        }
        .layout-right {
          padding-top: 50px;
          width: 220px;
          box-sizing: border-box;
          .right-block {
            width: 220px;
            height: 150px;
            background-color: #888;
            background-position: 50%;
            background-size: cover;
            border-radius: 2px;
            .block {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .right-tips {
            margin-top: 25px;
            .title {
              color: #383838;
              font-size: 16px;
              line-height: 22px;
              font-weight: bold;
            }
            .text {
              margin-top: 25px;
              font-size: 14px;
              line-height: 24px;
              color: #888;
              span {
                color: #383838;
                font-weight: bold;
              }
            }
          }
          .right-link {
            margin-top: 20px;
            color: #F4751D;
            font-size: 14px;
            line-height: 20px;
            cursor: pointer;
          }
          .wechat-img {
            margin-top: 40px;
            width: 120px;
            height: 120px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
