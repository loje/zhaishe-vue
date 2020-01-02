<template>
  <div class="tools-page max-width">
    <loading v-if="toolsLoading"></loading>
    <swiper v-else :options="toolsSwiperOption" ref="toolsSwiper">
      <template v-for="(item, $index) in toolsSwiperList">
      <swiper-slide :key="$index">
        <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
      </swiper-slide>
      </template>
    </swiper>

    <div class="the-layout">
      <div class="layout-left">
        <div class="pages">
          <div class="prev">上一页</div>
          <div class="page-list">
            <!-- <div class="page">1</div>
            <div class="page">2</div>
            <div class="page">3</div>
            <div class="page">4</div>
            <div class="page">5</div>
            <div class="page">6</div> -->
            <div :class="pagePro === item ? 'page active' : 'page'" v-for="item in proPages" :key="item" @click="getProducts(item)">{{item > 3 ? '···' : item}}</div>
          </div>
          <div class="next">下一页</div>
          
          <div class="search-bar">
            <i class="iconfont">&#xe652;</i>
            <input type="text" />
            <span>搜索</span>
          </div>
        </div>

        <div class="tools-list">
          <div class="the-tool" v-for="(item, $index) in productList" :key="$index">
            <div class="tool-left">
              <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
            </div>
            <div class="tool-middle">
              <div class="title">{{item.title}}</div>
              <div class="desc">{{item.desc}}</div>
            </div>
            <div class="tool-right">
              <router-link class="btn" :to="{path: '/tools/item', query: { id: item.id }}">购买</router-link>
              <!-- <router-link class="link" :to="{push: '/tools/item', query: { id: item.id }}">团购</router-link> -->
              <!-- <router-link class="link" :to="{push: '/tools/item', query: { id: item.id }}">返利</router-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="layout-right">
        <div class="right-block"></div>
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
    <!-- <div class="tool" v-for="item in productList" :key="item.id">
      <div class="tool-left">
        <div class="img" :style="{backgroundImage: `url(${item.src})`}" @click="$router.push(`/tools/item?id=${item.id}`)"></div>
      </div>
      <div class="tool-right">
        <div class="tool-title">{{item.title}}</div>
        <div class="tool-desc">{{item.desc}}</div>
        <div class="tool-btm">
          <div class="support">
            <div class="support-t">支持系统</div>
            <div class="sys-list">
              <template v-for="(i, $index) in item.sys" >
                <span class="sys" :key="$index">
                  <span v-html="i.icon"></span>
                </span>
              </template>
            </div>
          </div>
          <div class="btn-group">
            <a class="btn" @click="showBuy(item)">购买</a>
            <router-link :to="{path: '/download', query: { keyword: item.title }}">下载</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="dialogForm" v-if="dialogForm">
      <div class="dialog-box">
        <div class="dialog-left">
          <div class="img" :style="{backgroundImage: `url(${dialogForm.src})`}"></div>
          <input type="text" placeholder="请输入邀请码" />
        </div>
        <div class="dialog-right">
          <div class="form-t">
            <span class="original-price">原价：{{dialogForm.price}}元</span>
            <span class="group-price">团购价：{{dialogForm.groupPrice}}元</span>
          </div>
          <div class="form-group">
            <span>姓名</span>
            <input type="text" />
          </div>
          <div class="form-group">
            <span>邮箱</span>
            <input type="text" />
          </div>
          <div class="form-group">
            <span>微信</span>
            <input type="text" />
          </div>
          <div class="tips">{{tips}}</div>
          <a class="btn" @click="buy">购买</a>
        </div>
      </div>
      <div class="dialog-bg" @click="hideFrom"></div>
    </div>

    <div class="dialog-qrcode" v-if="dialogQrcode">
      <div class="dialog-box">
        <div class="img" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png);"></div>
        <div class="text">小编会第一时间联系您支付<br/>加小编了解进度</div>
      </div>
      <div class="dialog-bg" @click="hideQrcode"></div>
    </div> -->
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

      productList: [],
      proTotal: 0, // 总条数
      proPages: 0, // 总页数
      proLimit: 5, // 每页条数
      productLoading: false,
      skipPro: 0, // 跳过数量
      pagePro: 1, // 当前页数
      // dialogForm: '',
      // tips: '',

      // dialogQrcode: false,
    }
  },
  activated() {
    this.getBanner();
    this.getProCount();
    // this.getProducts();
  },
  methods: {
    getBanner() {
      let bannerQuery = this.$Bmob.Query('banner');
      bannerQuery.equalTo('position', '==', 'tools');
      this.toolsLoading = true;
      bannerQuery.find().then((res) => {
        this.toolsLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          this.toolsSwiperList.push({
            imgSrc: res[i].imgSrc,
            link: res[i].link,
          });
        }
      });
    },

    getProCount() {
      var query = this.$Bmob.Query('product');
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.proTotal = total;
        this.proPages = parseInt(total / this.proLimit);
        if (total % this.proLimit > 0) {
          this.proPages = this.proPages + 1;
        }
        this.getProducts(1);
      });
    },
    getProducts(page) {
      if (page) {
        if (page > this.proPages) {
          this.pagePro = this.proPages;
        } else if (page < 0) {
          this.pagePro = 1;
        } else {
          this.pagePro = page;
        }
      } else {
        this.pagePro = 1
      }

      var query = this.$Bmob.Query('product');
      this.skipPro = this.proLimit * (this.pagePro - 1);

      let arr = [];
      query.order('-endTime');
      query.equalTo('notDelete', '==', true);
      query.skip(this.skipPro);
      query.limit(this.proLimit);
      this.productLoading = true;
      query.find().then((res) => {
        this.productLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          // let arrb = [];
          // if (res[i].system) {
          //   let sysList = res[i].system;
          //   var querySys = this.$Bmob.Query('support_sys');
          //   for (let x = 0; x < sysList.length; x += 1) {
          //     querySys.get(sysList[x]).then((result) => {
          //       arrb.push({
          //         id: result.objectId,
          //         icon: result.icon,
          //         title: result.title,
          //       });
          //     });
          //   }
          // }
          
          arr.push({
            id: res[i].objectId,
            imgSrc: res[i].imgSrc,
            title: res[i].title,
            desc: res[i].desc,
            // groupPrice: res[i].groupPrice,
            // price: res[i].price,
            // sys: arrb,
          });
        }
        this.productList = arr;
      });
    },
    // showBuy(item) {
    //   this.dialogForm = item;
    // },
    // buy() {
    //   this.dialogForm = '';
    //   this.dialogQrcode = true;
    // },
    // hideFrom() {
    //   this.dialogForm = '';
    //   this.dialogQrcode = false;
    // },
    // hideQrcode() {
    //   this.dialogQrcode = false;
    // },
  },
};
</script>

<style lang="scss" scoped>
  .tools-page {
    padding: 20px 0 100px;
    background-color: #fff;
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
          transition: all ease-in-out 0.25s;
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
      display: flex;
      margin-top: 20px;
      width: 100%;
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
          border-radius: 2px;
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
    // .tool {
    //   display: flex;
    //   margin-bottom: 15px;
    //   width: 100%;
    //   height: 330px;
    //   .tool-left {
    //     width: 330px;
    //     height: 100%;
    //     background-color: #fff;
    //     border-radius: 10px;
    //     overflow: hidden;
    //     .img {
    //       width: 100%;
    //       height: 100%;
    //       background-position: 50%;
    //       background-size: contain;
    //       background-repeat: no-repeat;
    //       cursor: pointer;
    //     }
    //   }
    //   .tool-right {
    //     position: relative;
    //     margin-left: 10px;
    //     flex: 1;
    //     padding: 30px;
    //     height: 100%;
    //     background-color: #fff;
    //     border-radius: 10px;
    //     box-sizing: border-box;
    //     .tool-title{
    //       font-size: 24px;
    //       font-family: PingFang SC Medium;
    //       color: #333;
    //     }
    //     .tool-desc {
    //       margin-top: 25px;
    //       font-size: 16px;
    //       line-height: 30px;
    //       font-family: PingFang SC Light;
    //       color: rgba(153,153,153,1);
    //       text-overflow: -o-ellipsis-lastline;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       display: -webkit-box;
    //       -webkit-line-clamp: 2;
    //       line-clamp: 2;
    //       -webkit-box-orient: vertical;
    //     }
    //     .tool-btm {
    //       position: absolute;
    //       left: 30px;
    //       bottom: 30px;
    //       width: calc(100% - 60px);
    //       .support {
    //         .support-t {
    //           font-size: 16px;
    //           font-family: PingFang SC Light;
    //           color: #FFCB2B;
    //           line-height: 30px;
    //         }
    //         .sys-list {
    //           margin-top: 11px;
    //           .sys {
    //             display: inline-block;
    //             margin-right: 25px;
    //             line-height: 36px;
    //             >>>.icon {
    //               display: block;
    //               width: 32px;
    //               height: 32px;
    //             }
    //             .t {
    //               font-size: 12px;
    //               color: #ccc;
    //             }
    //           }
    //         }
    //       }
    //       .btn-group {
    //         display: flex;
    //         width: 100%;
    //         justify-content: flex-end;
    //         a {
    //           margin-right: 30px;
    //           font-size: 16px;
    //           font-family: PingFang SC Regular;
    //           color: rgba(92,157,255,1);
    //           line-height: 40px;
    //           cursor: pointer;
    //           &.btn {
    //             width: 100px;
    //             height: 40px;
    //             background: #FFCB2B;
    //             color: #333;
    //             text-align: center;
    //             border-radius: 10px;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }


  // .dialogForm {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.34);
  //   z-index: 1;
  //   .dialog-box {
  //     position: relative;
  //     display: flex;
  //     margin: auto;
  //     padding: 30px;
  //     background-color: #fff;
  //     border-radius: 10px;
  //     box-sizing: border-box;
  //     z-index: 1;
  //     .dialog-left {
  //       text-align: center;
  //       .img {
  //         width: 300px;
  //         height: 300px;
  //         background-position: 50%;
  //         background-size: contain;
  //         background-repeat: no-repeat;
  //       }
  //       input {
  //         width: 273px;
  //         height: 40px;
  //         background: rgba(235,235,235,1);
  //         border: none;
  //         outline: none;
  //         border-radius: 10px;
  //         text-align: center;
  //         font-size: 18px;
  //         box-sizing: border-box;
  //       }
  //     }

  //     .dialog-right {
  //       position: relative;
  //       margin-left: 50px;
  //       .form-t {
  //         margin-bottom: 15px;
  //         .original-price {
  //           margin-right: 20px;
  //           font-size: 16px;
  //           font-family: PingFang SC Regular;
  //           color: rgba(153,153,153,1);
  //         }
  //         .group-price {
  //           font-size: 16px;
  //           font-family: PingFang SC Regular;
  //           color: rgba(243,107,107,1);
  //         }
  //       }
  //       .form-group {
  //         margin-top: 15px;
  //         span {
  //           font-size: 16px;
  //           font-family: PingFang SC Regular;
  //           color: #333;
  //           letter-spacing: 5px;
  //         }
  //         input {
  //           margin-left: 7px;
  //           width: 300px;
  //           height: 40px;
  //           line-height: 40px;
  //           font-size: 16px;
  //           border: none;
  //           outline: none;
  //           border-bottom: 1px solid #ddd;
  //         }
  //       }
  //       .tips {
  //         margin-top: 15px;
  //         margin-bottom: 15px;
  //         font-size: 16px;
  //         font-family: PingFang SC Regular;
  //         width: 100%;
  //         height: 23px;
  //         color: rgba(243,107,107,1);
  //       }
  //       .btn {
  //         position: absolute;
  //         left: 0;
  //         bottom: 0;
  //         display: block;
  //         text-decoration: none;
  //         width: 100%;
  //         height: 40px;
  //         line-height: 40px;
  //         background: rgba(241,196,74,1);
  //         text-align: center;
  //         font-size: 16px;
  //         font-family: PingFang SC Regular;
  //         color: #333;
  //         border-radius: 10px;
  //         cursor: pointer;
  //       }
  //     }
  //   }
  //   .dialog-bg {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 0;
  //   }
  // }

  // .dialog-qrcode {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.34);
  //   z-index: 1;
  //   .dialog-box {
  //     position: relative;
  //     margin: auto;
  //     padding: 50px;
  //     background-color: #fff;
  //     border-radius: 10px;
  //     box-sizing: border-box;
  //     z-index: 1;
  //     .img {
  //       width: 340px;
  //       height: 340px;
  //       background-size: contain;
  //     }
  //     .text {
  //       text-align: center;
  //       font-size: 18px;
  //       font-family: PingFang SC Regular;
  //       color: #333;
  //       line-height: 30px;
  //     }
  //   }
  //   .dialog-bg {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 0;
  //   }
  // }
  
</style>
