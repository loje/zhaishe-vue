<template>
  <div class="tools-page">
    <!-- <div class="max-width">
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
    </div> -->
    <Search></Search>

    <div class="the-layout">
      <div class="max-width">
        <div class="layout-left">
          <!-- <div class="pages">
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
          </div> -->
          <div class="list-top">
            <div class="title">设计师工具</div>

            <div class="tabs">
              <div :class="actTab === '付费软件' ? 'tab active' : 'tab'" @click="getToolCount('付费软件')">付费软件</div>
              <div :class="actTab === '免费' ? 'tab active' : 'tab'" @click="getToolCount('免费')">免费</div>
            </div>
          </div>
          <div class="tools-list">
            <div class="the-tool" v-for="(item, $index) in productList" :key="$index">
              <div class="tool-left">
                <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
              </div>
              <div class="tool-middle">
                <div class="title">{{item.title}}</div>
                <div class="price">
                  <span class="price-style">团购</span>
                  <span class="the-price" v-if="!item.maxPrice || !item.maxPrice || (item.maxPrice === item.minPrice)">{{item.price}}元</span>
                  <span class="the-price" v-else>{{item.minPrice}}~{{item.maxPrice}}元</span>
                </div>
                <div class="desc">{{item.desc}}</div>
                <div class="middle-btm">
                  <div class="tag-list">
                    <div class="tag">MAC</div>
                    <div class="tag">WIN</div>
                    <div class="tag">IOS</div>
                    <div class="tag">Linux</div>
                  </div>
                  <div class="like">
                    <i class="iconfont">&#xe602;</i> 1020
                  </div>
                  <router-link class="btn" :to="`/tools/item/${item.id}`">购买</router-link>
                </div>
              </div>
              <!-- <div class="tool-right">
                <router-link class="btn" :to="`/tools/item/${item.id}`">购买</router-link>
              </div> -->
            </div>
          </div>
        </div>
        <div class="layout-right">
          <div class="sell-notice">
            <div class="title">购买消息</div>
            <div class="notice-list">
              <div class="notice">
                <span class="notice-left">用户bill在宅设拼团eagle</span>
                <span class="notice-right">1小时前</span>
              </div>
              <div class="notice">
                <span class="notice-left">用户bill在宅设拼团eagle</span>
                <span class="notice-right">1小时前</span>
              </div>
              <div class="notice">
                <span class="notice-left">用户bill在宅设拼团eagle</span>
                <span class="notice-right">1小时前</span>
              </div>
              <div class="notice">
                <span class="notice-left">用户bill在宅设拼团eagle</span>
                <span class="notice-right">1小时前</span>
              </div>
            </div>
          </div>

          <div class="sell-tips">
            <div class="title">购买需知</div>
            <div class="text">平台可提供优惠购买服务，购买的时请加小编微信：zhaishehui01 </div>
            <div class="text"><span>团购 - </span>我们需要凑满人数才会统一发出，所以不是第一时间拿到，请联系小编，及时跟进</div>
            <div class="text"><span>返利券 - </span>小编会给出返利，可以凭优返利购买，记得找请找小编领取</div>
            <div class="text"><span>无提示 - </span>无优惠，只推荐</div>
          </div>

          <div class="contact">
            <div class="contact-left">
              <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
            </div>
            <div class="contact-right">
              <div class="tel">
                <div class="tel-t">客服电话</div>
                <div class="tel-num">186 7551 0353</div>
              </div>
              <div class="tips">欢迎使用微信小程序</div>
            </div>
          </div>
          <!-- <div class="right-block" :style="{backgroundImage: `url(${toolsAd.imgSrc})`}">
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import loading from '@/components/Loading';
// import '@/assets/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Search from '@/components/Search';

export default {
  components: {
    // loading,
    // swiper,
    // swiperSlide,
    Search,
  },
  data() {
    return {
      actTab: '付费软件',
      // toolsLoading: false,
      // toolsSwiperList: [],
      // toolsSwiperOption: {
      //   autoplay: true,
      //   loop : true,
      //   delay: 1000,
      //   slidesPerView: 3,
      //   spaceBetween: 30,
      // },

      toolsAd: '',

      productList: [],
      proTotal: 0, // 总条数
      // proPages: 0, // 总页数
      // proLimit: 5, // 每页条数
      productLoading: false,
      // skipPro: 0, // 跳过数量
      // pagePro: 1, // 当前页数

      // keyword: '',
    }
  },
  activated() {
    // this.getBanner();
    this.getProCount();
  },
  methods: {
    getToolCount(tab) {
      this.actTab = tab;
    },
    // getBanner() {
    //   let bannerQuery = this.$Bmob.Query('banner');

    //   this.toolsLoading = true;
    //   bannerQuery.find().then((res) => {
    //     this.toolsLoading = false;
    //     for (let i = 0; i < res.length; i += 1) {
    //       if (res[i].position === 'tool') {
    //         this.toolsSwiperList.push({
    //           imgSrc: res[i].imgSrc,
    //           link: res[i].link,
    //         });
    //       }
    //       if (res[i].position === 'toolAd') {
    //         this.toolsAd = {
    //           imgSrc: res[i].imgSrc,
    //           link: res[i].link,
    //         };
    //       }
    //     }
    //   });
    // },

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
      query.equalTo('status', '==', 0);
      if (this.keyword) {
        query.equalTo("title","===", this.keyword);
      }
      // query.skip(this.skipPro);
      // query.limit(this.proLimit);
      this.productLoading = true;
      query.find().then((res) => {
        this.productLoading = false;
        for (let i = 0; i < res.length; i += 1) {    
          let skuquery = this.$Bmob.Query('skus');
          skuquery.equalTo('productId', '===', res[i].objectId);
          skuquery.find().then((r) => {
            let ar = [];
            for (let o = 0; o < r.length; o += 1) {
              ar.push(r[o].attrPrice);
            }
            arr.push({
              id: res[i].objectId,
              imgSrc: res[i].imgSrc,
              title: res[i].title,
              desc: res[i].desc,
              price: res[i].price,
              skus: r,
              maxPrice:ar.sort()[ar.length - 1],
              minPrice:ar.sort()[0],
            });
          })
        }
        this.productList = arr;
      });
    },
  },
};
</script>

<style lang="scss" scoped>

  .tools-page {
    // padding-top: 20px;
    // .swiper-container {
    //   width: 100%;
    //   .swiper-slide {
    //     display: flex;
    //     align-items: center;
    //     width: 360px;
    //     height: 187px;
    //     .img {
    //       width: 352px;
    //       height: 170px;
    //       background-position: 50%;
    //       background-size: cover;
    //       .link {
    //         display: block;
    //         width: 100%;
    //         height: 100%;
    //       }
    //     }
    //     &.swiper-slide-next {
    //       .img {
    //         width: 360px;
    //         height: 187px;
    //       }
    //     }
    //   }
    // }

    .the-layout {
      // margin-top: 20px;
      padding-bottom: 60px;
      width: 100%;
      // background-color: #fff;
      .max-width {
        display: flex;
        .layout-left {
          flex: 1;
          padding-right: 60px;
          box-sizing: border-box;
          // .pages {
          //   position: relative;
          //   margin-bottom: 20px;
          //   width: 100%;
          //   height: 50px;
          //   border-bottom: 1px solid #F2F2F2;
          //   text-align: center;
          //   .prev, .next {
          //     display: inline-block;
          //     vertical-align: middle;
          //     line-height: 50px;
          //     color: #888;
          //     font-size: 12px;
          //   }
          //   cursor: pointer;
          //   // .page-list {
          //   //   display: inline-flex;
          //   //   margin: 0 15px;
          //   //   line-height: 50px;
          //   //   vertical-align: middle;
          //   //   .page {
          //   //     width: 34px;
          //   //     height: 50px;
          //   //     line-height: 50px;
          //   //     font-size: 16px;
          //   //     font-weight: bold;
          //   //     color: #000;
          //   //     text-align: center;
          //   //     cursor: pointer;
          //   //     &:hover, &.active {
          //   //       color: #fff;
          //   //       background-color: #F4C51D;
          //   //     }
          //   //   }
          //   // }

          //   // .search-bar {
          //   //   position: absolute;
          //   //   right: 0;
          //   //   bottom: 10px;
          //   //   display: flex;
          //   //   align-items: center;
          //   //   width: 170px;
          //   //   height: 30px;
          //   //   background-color: #FCFCFC;
          //   //   i {
          //   //     display: inline-block;
          //   //     width: 24px;
          //   //     line-height: 30px;
          //   //     color: #888;
          //   //   }
          //   //   input {
          //   //     padding: 0px 5px;
          //   //     width: 110px;
          //   //     height: 30px;
          //   //     border:none;
          //   //     outline: none;
          //   //     background-color: transparent;
          //   //     box-sizing: border-box;
          //   //   }
          //   //   span {
          //   //     display: inline-block;
          //   //     width: 24px;
          //   //     text-align: right;
          //   //     word-break: keep-all;
          //   //     line-height: 30px;
          //   //     font-size: 12px;
          //   //     color: #888;
          //   //     cursor: pointer;
          //   //   }
          //   // }
          // }

          .list-top {
            display: flex;
            padding: 0 15px;
            width: 100%;
            height: 50px;
            background-color: #fff;
            border-bottom: 1px solid #F5F5F5;
            box-sizing: border-box;
            .title {
              color: #383838;
              line-height: 50px;
              font-size: 18px;
              font-weight: bold;
            }
            .tabs {
              display: flex;
              padding-left: 100px;
              height: 100%;
              .tab {
                margin-right: 50px;
                line-height: 50px;
                height: 50px;
                color: #333;
                font-size: 16px;
                cursor: pointer;
                box-sizing: border-box;
                &.active {
                  color: #F4C51D;
                  border-bottom: 4px solid #F4C51D;
                }
              }
            }
          }
          .tools-list {
            padding: 0 15px;
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            .the-tool {
              display: flex;
              padding: 20px 0;
              // margin-bottom: 25px;
              width: 100%;
              border-bottom: 1px solid #eee;
              box-sizing: border-box;
              // &:last-child {
              //   margin-bottom: 0;
              // }
              .tool-left {
                width: 180px;
                height: 180px;
                .img {
                  width: 100%;
                  height: 100%;
                  background-position: 50%;
                  background-size: cover;
                  border-radius: 2px;
                  box-sizing: border-box;
                }
              }
              .tool-middle {
                position: relative;
                flex: 1;
                padding-left: 20px;
                box-sizing: border-box;
                .title {
                  font-size: 16px;
                  font-weight: bold;
                  color: #383838;
                  line-height: 22px;
                }
                .price {
                  margin-top: 10px;
                  color: #F4751D;
                  .price-style {
                    margin-right: 10px;
                    font-size: 14px;
                  }
                  .the-price {
                    font-size: 20px;
                  }
                }
                .desc {
                  margin-top: 10px;
                  font-size: 14px;
                  color: #888;
                  line-height: 24px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .middle-btm {
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  display: flex;
                  padding-left: 20px;
                  width: 100%;
                  box-sizing: border-box;
                  .tag-list {
                    flex: 1;
                    display: flex;
                    .tag {
                      margin-right: 6px;
                      width: 50px;
                      height: 20px;
                      line-height: 20px;
                      text-align: center;
                      background-color: #f5f5f5;
                      font-size: 10px;
                      color: #999;
                    }
                  }
                  .like {
                    margin-right: 18px;
                    width: 66px;
                    height: 26px;
                    line-height: 24px;
                    border: 1px solid #F4751D;
                    color: #888888;
                    font-size: 10px;
                    text-align: center;
                    border-radius: 2px;
                    box-sizing: border-box;
                    cursor: pointer;
                    i {
                      font-size: 10px;
                    }
                  }
                  .btn {
                    width: 100px;
                    height: 26px;
                    line-height: 26px;
                    background-color: #F4751D;
                    text-align: center;
                    color: #fff;
                    font-size: 10px;
                    border-radius: 2px;
                  }
                }
              }
              // .tool-right {
              //   padding-top: 15px;
              //   width: 100px;
              //   text-align: center;
              //   box-sizing: border-box;
              //   .btn {
              //     display: block;
              //     width: 100%;
              //     height: 40px;
              //     line-height: 40px;
              //     border: 1px solid #F4751D;
              //     color: #F4751D;
              //     font-size: 14px;
              //     border-radius: 2px;
              //     box-sizing: border-box;
              //     transition: all 250ms ease-in-out;
              //     &:hover {
              //       background-color: rgba(244,117,29,0.3);
              //     }
              //   }
              //   .link {
              //     display: inline-block;
              //     margin-top: 10px;
              //     color: #383838;
              //     font-size: 12px;
              //     line-height: 17px;
              //   }
              // }
            }
          }
        }
        .layout-right {
          width: 325px;
          box-sizing: border-box;
          // .right-block {
          //   width: 220px;
          //   height: 150px;
          //   background-color: #888;
          //   background-position: 50%;
          //   background-size: cover;
          //   border-radius: 2px;
          //   .block {
          //     display: block;
          //     width: 100%;
          //     height: 100%;
          //   }
          // }
          // .right-tips {
          //   margin-top: 25px;
          //   .title {
          //     color: #383838;
          //     font-size: 16px;
          //     line-height: 22px;
          //     font-weight: bold;
          //   }
          //   .text {
          //     margin-top: 25px;
          //     font-size: 14px;
          //     line-height: 24px;
          //     color: #888;
          //     span {
          //       color: #383838;
          //       font-weight: bold;
          //     }
          //   }
          // }
          // .right-link {
          //   margin-top: 20px;
          //   color: #F4751D;
          //   font-size: 14px;
          //   line-height: 20px;
          //   cursor: pointer;
          // }
          // .wechat-img {
          //   margin-top: 40px;
          //   width: 120px;
          //   height: 120px;
          //   img {
          //     width: 100%;
          //   }
          // }
          .sell-notice {
            padding: 20px 20px 20px 30px;
            background-color: #fff;
            box-sizing: border-box;
            .title {
              font-size: 16px;
              color: #383838;
              line-height: 22px;
            }
            .notice-list {
              width: 100%;
              .notice {
                margin-top: 10px;
                font-size: 12px;
                color: #888;
                .notice-right {
                  float: right;
                }
              }
            }
          }
          .sell-tips {
            margin-top: 20px;
            padding: 20px 20px 20px 30px;
            background-color: #fff;
            box-sizing: border-box;
            .title {
              margin-bottom: 10px;
              color: #383838;
              font-size: 16px;
              line-height: 22px;
              font-weight: bold;
            }
            .text {
              margin-bottom: 25px;
              font-size: 14px;
              line-height: 24px;
              color: #888;
              span {
                color: #383838;
                font-weight: bold;
              }
            }
          }

          .contact {
            display: flex;
            margin-top: 20px;
            padding: 20px 20px 20px 20px;
            width: 100%;
            background-color: #FFF7D9;
            box-sizing: border-box;
            .contact-left {
              width: 105px;
              height: 105px;
              img {
                max-width: 100%;
              }
            }
            .contact-right {
              position: relative;
              padding-left: 15px;
              .tel {
                .tel-t {
                  font-size: 16px;
                  line-height: 22px;
                  color: #333;
                }
                .tel-num {
                  margin-top: 5px;
                  font-size: 22px;
                  line-height: 30px;
                  color: #333;
                }
              }
              .tips {
                position: absolute;
                left: 15px;
                bottom: 0;
                padding: 0 10px;
                height: 30px;
                line-height: 30px;
                background-color: #FFECA7;
                color: #333;
                font-size: 14px;
                border-radius: 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
