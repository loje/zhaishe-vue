<template>
  <div class="tools-page">
    <div class="tools-top">
      <div class="max-width">
        <div class="media">
          <div class="media-left">
            <loading class="img" v-if="loading === true"></loading>
            <div v-else class="img" :style="{backgroundImage: `url(${imgSrc})`}"></div>
          </div>
          <loading v-if="loading === true"></loading>
          <template v-else>
          <div class="media-right">
            <div class="media-info">
              <div class="title"><span>热门软件</span>{{title}}</div>
              <div class="sub-title">{{desc}}</div>

              <div class="info-btm">
                <span class="sell">已销售1034份</span>
                <span class="url">https://cn.eagle.cool <span>跳转官网查看</span></span>
              </div>
            </div>
          </div>
          </template>
        </div>

        <template v-if="isBuy === false">
        <div class="price-bar">
          <div class="btn active">团购：{{groupPrice}}元</div>
          <div class="btn">正常购：{{price}}元</div>

          <input type="text" v-model="couponCode" placeholder="请输入推荐码" />

          <div class="bar-right">
            <span class="t">你选择是团购</span>
            <span class="price">价格<span>0</span>元</span>
            <div class="btn active btn-buy" @click="isBuy = true">购买</div>
          </div>
        </div>

        <div class="tips">
          <div class="tips-left">
            <div class="title">购买需知</div>
            <div class="text">所有优惠购买的活动都是通过微信团购、或者返利形式给到大家优惠，所以购买时需要填写您的可添加微信，这样方便 小编第一时间加到您，添加您到优惠队列中，所有购买不会第一时间拿到，请大家购买前注意</div>
          </div>
          <div class="tips-right">
            <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
          </div>
        </div>
        </template>

        <template v-if="isBuy === true">
        <div class="buy-layer">
          <div class="back" @click="isBuy = false">
            <span class="back-icon">
              <i class="iconfont">&#xe693;</i>
            </span>
            <span class="t">返回</span>
          </div>
          <div class="buy-flex" style="padding-right: 48px;text-align: right;">
            <div class="wechat-qrcode">
              <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png"/>
              <div class="text">我还有疑问</div>
            </div>
          </div>
          <div class="buy-flex" style="padding-left: 48px;">
            <div class="title">
              <span class="t">您选择的是团购</span>
              <span class="t">价格<span>140</span>元</span>
            </div>

            <div class="input-group">
              <span>姓名</span>
              <input type="text" placeholder="请填写姓名" />
            </div>
            <div class="input-group">
              <span>可添加微信</span>
              <input type="text" placeholder="请填写微信" />
            </div>
            <div class="input-group">
              <span>电话</span>
              <input type="text" placeholder="留下您电话方便联系" />
            </div>
            <div class="input-group">
              <span>邮箱</span>
              <input type="text" placeholder="您的收件邮箱" />
            </div>
            <div class="error">1423435</div>
            <div class="btn">微信支付</div>
          </div>
        </div>
        <div class="buy-tips">
          <div class="title">购买需知</div>
          <div class="text">所有优惠购买的活动都是通过微信团购、或者返利形式给到大家优惠，所以购买时需要填写您的可添加微信，这样方便 小编第一时间加到您，添加您到优惠队列中，所有购买不会第一时间拿到，请大家购买前注意</div>
        </div>
        </template>
      </div>
    </div>

    <div class="tools-detail" v-if="isBuy === false">
      <div class="max-width">
        <loading v-if="loading === true"></loading>
        <article v-else v-html="content"></article>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '@/components/Loading';
export default {
  components: {
    loading,
  },
  data() {
    return {
      loading: false,
      imgSrc: '',
      title: '',
      desc: '',
      sys: [],
      content: '',

      couponCode: '',

      isBuy: false,
    }
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.loading = true;
      var query = this.$Bmob.Query('product');
      query.get(this.$route.query.id).then((res) => {
        this.loading = false;
        this.imgSrc = res.imgSrc || '';
        this.title = res.title || '';
        this.desc = res.desc || '';
        this.content = res.content;
        this.groupPrice = res.groupPrice;
        this.price = res.price;

        if (res.system) {
          let sysList = res.system;
          let arrb = [];
          var querySys = this.$Bmob.Query('support_sys');
          for (let x = 0; x < sysList.length; x += 1) {
            querySys.get(sysList[x]).then((result) => {
              arrb.push({
                id: result.objectId,
                icon: result.icon,
                title: result.title,
              });
            });
          }
          this.sys = arrb;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .tools-page {
    .tools-top {
      padding: 50px 0 30px;
      background-color: #FCFCFC;
      .max-width {
        padding: 40px 90px 50px;
        background-color: #fff;
        box-sizing: border-box;
        .media {
          display: flex;
          align-items: top;
          width: 100%;
          height: 160px;
          overflow: hidden;
          .media-left {
            width: 260px;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            .img {
              width: 100%;
              height: 100%;
              background-position: 50%;
              background-size: cover;
              border: 1px solid #D8D8D8;
              box-sizing: border-box;
              border-radius: 2px;
              overflow: hidden;
            }
          }
          .media-right {
            flex: 1;
            height: 100%;
            box-sizing: border-box;
            padding-left: 30px;
            .media-info {
              position: relative;
              padding-top: 10px;
              height: 100%;
              background-color: #fff;
              border-radius: 10px;
              box-sizing: border-box;
              .title {
                font-size: 20px;
                font-family: PingFang SC Regular;
                color: #262626;
                line-height: 32px;
                font-weight: bold;
                span {
                  display: inline-block;
                  margin-right: 10px;
                  width: 56px;
                  height: 20px;
                  font-size: 12px;
                  line-height: 20px;
                  border: 1px solid #FF5D01;
                  border-radius: 2px;
                  text-align: center;
                  color: #FF5D01;
                }
              }
              .sub-title {
                margin-top: 10px;
                font-size: 14px;
                font-family: PingFang SC Regular;
                color: #888;
                line-height: 24px;
              }
              .info-btm {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                font-size: 12px;
                line-height: 17px;
                color: #888;
                .sell {
                  margin-right: 70px;
                }
                .url span {
                  margin-left: 10px;
                }
              }
              // .support {
              //   margin-top: 20px;
              //   .support-t {
              //     font-size: 16px;
              //     font-family: PingFang SC Light;
              //     color: #FFCB2B;
              //     line-height: 30px;
              //   }
              //   .sys-list {
              //     margin-top: 11px;
              //     .tools-sys {
              //       display: inline-block;
              //       margin-right: 25px;
              //       line-height: 24px;
              //     }
              //   }
              // }

              // .btn-group {
              //   position: absolute;
              //   right: 30px;
              //   bottom: 30px;
              //   display: flex;
              //   width: 100%;
              //   justify-content: flex-end;
              //   a {
              //     margin-right: 30px;
              //     font-size: 16px;
              //     font-family: PingFang SC Regular;
              //     color: rgba(92,157,255,1);
              //     line-height: 40px;
              //     cursor: pointer;
              //     &.btn {
              //       width: 100px;
              //       height: 40px;
              //       background: #FFCB2B;
              //       color: #333;
              //       text-align: center;
              //       border-radius: 10px;
              //     }
              //   }
              // }
            }
          }
        }

        .price-bar {
          margin-top: 50px;
          padding: 17px 24px;
          width: 100%;
          background-color: #FCFCFC;
          box-sizing: border-box;
          .btn {
            display: inline-block;
            vertical-align: middle;
            margin-right: 40px;
            width: 112px;
            height: 36px;
            font-size: 14px;
            line-height: 34px;
            border: 1px solid #DCDCDC;
            color: #262626;
            text-align: center;
            border-radius: 2px;
            font-weight: bold;
            box-sizing: border-box;
            cursor: pointer;
            &.active {
              border-color: #F4751D;
              color: #F4751D;
            }
          }
          input {
            display: inline-block;
            vertical-align: middle;
            padding: 0 15px;
            height: 36px;
            box-sizing: border-box;
            outline: none;
            border: 1px solid #DCDCDC;
            text-align: center;
            box-sizing: border-box;
          }

          .bar-right {
            float: right;
            display: flex;
            color: #262626;
            font-size: 12px;
            line-height: 36px;
            height: 36px;
            .t {
              line-height: 36px;
            }
            .price{
              margin-left: 10px;
              span {
                margin: 0 5px;
                font-size: 18px;
              }
            }
            .btn {
              margin-left: 50px;
              &.btn-buy {
                margin-right: 0;
                background-color: rgba(244,117,29,0.3);
              }
            }
            
          }
        }

        .tips {
          display: flex;
          margin-top: 30px;
          padding: 0 24px;
          width: 100%;
          box-sizing: border-box;
          .tips-left {
            flex: 1;
            padding-right: 10px;
            box-sizing: border-box;
            .title {
              color: #262626;
              font-size: 14px;
              line-height: 32px;
            }
            .text {
              color: #888888;
              font-size: 14px;
              line-height: 24px;
            }
          }
          .tips-right {
            width: 90px;
            img {
              width: 90px;
            }
          }
        }

        .buy-layer {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 50px;
          padding: 0px 80px;
          padding-top: 25px;
          border-top: 1px solid #F2F2F2;
          box-sizing: border-box;
          .back {
            position: absolute;
            left: 80px;
            top:25px;
            cursor: pointer;
            .back-icon {
              display: inline-block;
              width: 20px;
              height: 28px;
              line-height: 28px;
              border: 1px solid #F2F2F2;
              border-radius: 2px;
              color: #F4C51D;
              font-size: 12px;
              text-align: center;
            }
            .t {
              margin-left: 10px;
              line-height: 28px;
              font-size: 12px;
              color: #262626;
            }
          }
          .buy-flex {
            width: 50%;
            box-sizing: border-box;
            .wechat-qrcode {
              display: inline-block;
              width: 170px;
              height: 170px;
              img {
                display: block;
                width: 100%;
              }
              .text {
                text-align: center;
                font-size: 12px;
                color: #979797;
              }
            }
            .title {
              margin-bottom: 30px;
              font-size: 12px;
              font-family: PingFangSC;
              color: #262626;
              line-height: 17px;
              .t {
                margin-right: 10px;
                span {
                  font-size: 24px;
                  color: #FF5D01;
                }
              }
            }
            .input-group {
              display: flex;
              margin-bottom: 20px;
              padding: 0px 10px;
              width: 280px;
              height: 36px;
              line-height: 34px;
              border: 1px solid #979797;
              font-size: 12px;
              box-sizing: border-box;
              span {
                color: #888;
                width: 70px;
              }
              input {
                padding: 0;
                height: 34px;
                border: none;
                outline: none;
                box-sizing: border-box;
              }
            }
            .error {
              margin-bottom: 30px;
              font-size: 12px;
              height: 17px;
              color: #E55D5D;
            }
            .btn {
              width: 280px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: rgba(244,117,29,0.30);
              border: 1px solid #F4751D;
              border-radius: 2px;
              color: #F4751D;
              cursor: pointer;
            }
          }
        }

        .buy-tips {
          padding: 50px 80px 0px;
          .title {
            font-size: 14px;
            line-height: 32px;
            color: #262626;
            font-weight: bold;
          }
          .text {
            font-size: 14px;
            line-height: 24px;
            color: #888;
          }
        }
      }
    }

    .tools-detail {
      // margin-top: 15px;
      margin-bottom: 20px;
      padding-top: 60px;
      min-height: 800px;
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      .max-width {
        max-width: 900px;
        article {
          width: 100%;
          box-sizing: border-box;
          img {
            max-width: 100%;
          }
          p {
            width: 100%;
            img {
              max-width: 100%;
            }
          }
        }
      }
    }
  }
</style>