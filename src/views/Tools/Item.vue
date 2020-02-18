<template>
  <div class="tools-page">
    <div class="tools-top">
      <div class="max-width">
        <div class="media">
          <div class="media-left">
            <loading class="img" v-if="loading === true"></loading>
            <div v-else class="img" :style="{backgroundImage: `url(${info.imgSrc})`}"></div>
          </div>
          <loading v-if="loading === true"></loading>
          <template v-else>
          <div class="media-right">
            <div class="media-info">
              <div class="title">
                <span v-if="info.isHot === 1">热门软件</span>
                {{info.title}}
              </div>
              <div class="sub-title">{{info.desc}}</div>

              <div class="info-btm">
                <span class="sell">已销售{{info.count}}份</span>
                <span class="url">{{info.website}}</span>
                <a :href="info.website" target="blank">跳转官网查看</a>
              </div>
            </div>
          </div>
          </template>
        </div>

        <template v-if="step === 1">
        <div class="price-bar">
          <div :class="activePrice === 2 ? 'btn active' : 'btn'" v-if="info.groupPrice" @click="selectPrice(2)">团购：{{info.groupPrice}}元</div>
          <div :class="activePrice === 1 ? 'btn active' : 'btn'" @click="selectPrice(1)">正常购：{{info.price}}元</div>

          <!-- <input type="text" v-model="couponCode" placeholder="请输入推荐码" /> -->

          <div class="bar-right">
            <span class="t" v-if="activePrice === 1">你选择是正常购</span>
            <span class="t" v-if="activePrice === 2">你选择是团购</span>
            <span class="price">价格
              <span v-if="activePrice === 1">{{info.price}}</span>
              <span v-if="activePrice === 2">{{info.groupPrice}}</span>
            元</span>
            <div class="btn active btn-buy" @click="buy">购买</div>
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

        <template v-if="step !== 1">
        <div class="buy-layer">
          <div class="back" @click="back">
            <span class="back-icon">
              <i class="iconfont">&#xe693;</i>
            </span>
            <span class="t">返回</span>
          </div>

          <div class="buy-steps">
            <div class="step">
              <div :class="step === 1 ? 'count active' : 'count'">1</div>
              <div class="step-t">拍下商品</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 2 ? 'count active' : 'count'">2</div>
              <div class="step-t">支付信息</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 3 ? 'count active' : 'count'">3</div>
              <div class="step-t">确认扫码</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 4 ? 'count active' : 'count'">4</div>
              <div class="step-t">支付反馈</div>
            </div>
          </div>

          <div class="buy-box" v-if="step === 2">
            <div class="box-form">
              <div class="input-group">
                <span>姓名</span>
                <input type="text" v-model="dialog.name" placeholder="请填写姓名" />
              </div>
              <div class="input-group">
                <span>可添加微信</span>
                <input type="text" v-model="dialog.wechat" placeholder="请填写微信" />
              </div>
              <div class="input-group">
                <span>电话</span>
                <input type="text" v-model="dialog.phone" placeholder="留下您电话方便联系" :disabled="$store.state.user.mobilePhoneNumber" />
              </div>
              <div class="input-group" style="margin: 0;">
                <span>邮箱</span>
                <input type="text" v-model="dialog.email" placeholder="您的收件邮箱" />
              </div>
              <div class="error">{{dialogError}}</div>

              <div class="text" v-if="activePrice === 1">您选择的是正常购 价格<span>{{info.price}}</span>元</div>
              <div class="text" v-if="activePrice === 2">您选择的是团购 价格<span>{{info.groupPrice}}</span>元</div>

              <div class="btn" @click="payit">
                <i class="iconfont">&#xe629;</i>
                <span>微信支付</span>
              </div>
            </div>
          </div>

          <template v-if="step === 3">
          <div class="select-price" v-if="activePrice === 1">实付<span>{{info.price}}</span>元</div>
          <div class="select-price" v-if="activePrice === 2">实付<span>{{info.groupPrice}}</span>元</div>
          <div class="qrcode-box">
            <wechatPay :out_trade_no="payForm.out_trade_no" :total_fee="payForm.total_fee" :body="payForm.body" @order-success="getReslut" :size="143"></wechatPay>
          </div>
          <div class="wechat-text">微信扫码支付</div>
          </template>

          <template v-if="step === 4">
          <div :class="payReslut.trade_state !== 'SUCCESS' ? 'pay-result fail' : 'pay-result'">
            <i class="iconfont" v-if="payReslut.trade_state === 'SUCCESS'">&#xe607;</i>
            <i class="iconfont" v-else>&#xea13;</i>

            <div class="t">{{payReslut.trade_state_desc}}</div>
          </div>
          </template>
        </div>
        <div class="buy-tips">
          <div class="title">购买需知</div>
          <div class="text">所有优惠购买的活动都是通过微信团购、或者返利形式给到大家优惠，所以购买时需要填写您的可添加微信，这样方便 小编第一时间加到您，添加您到优惠队列中，所有购买不会第一时间拿到，请大家购买前注意</div>
        </div>
        </template>
      </div>
    </div>

    <div class="tools-detail" v-if="step === 1">
      <div class="max-width">
        <loading v-if="loading === true"></loading>
        <article v-else v-html="info.content"></article>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '@/components/Loading';
import wechatPay from '@/components/WechatPay';

export default {
  components: {
    loading,
    wechatPay,
  },
  data() {
    return {
      loading: false,
      info: {},

      activePrice: 1,
      dialog: {},
      dialogError: '',

      step: 1,
      payForm: {
        out_trade_no: '',
        total_fee: '',
        body: '',
      },

      payReslut: '',

      couponCode: '',
    }
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    selectPrice(i) {
      this.activePrice = i;
    },
    getinfo() {
      this.loading = true;
      var query = this.$Bmob.Query('product');
      query.get(this.$route.query.id).then((res) => {
        this.loading = false;
        this.info = {
          ...this.info,
          imgSrc: res.imgSrc,
          isHot: res.isHot ? res.isHot : 0,
          title: res.title,
          desc: res.desc,
          // address: res.address,
          website: res.website ? res.website : '',

          price: res.price || 0,
          inventory: res.inventory || 0,
          groupPrice: res.groupPrice || 0,
          groupInventory: res.groupInventory || 0,
          content: res.content,
        };
      });

      const pointer = this.$Bmob.Pointer('product')
      const poiID = pointer.set(this.$route.query.id);

      let orderQuery = this.$Bmob.Query('order_list');
      orderQuery.equalTo("product","==", poiID);
      orderQuery.count().then((count) => {
        this.info = {
          ...this.info,
          count,
        };
      });
    },

    back() {
      this.step = 1;
    },
    buy() {
      if (!localStorage.getItem('memberInfo')) {
        alert('请先点右上角登录');
        return false;
      }
      this.step = 2;
      this.dialog = {
        name: this.$store.state.user.name,
        wechat: this.$store.state.user.wechatId,
        phone: this.$store.state.user.mobilePhoneNumber,
        email: this.$store.state.user.email,
      };
    },
    payit() {
      if (!this.dialog.name) {
        this.dialogError = '请填写名字';
        return false;
      }
      if (!this.dialog.wechat) {
        this.dialogError = '请填写微信';
        return false;
      }
      if (!this.dialog.phone) {
        this.dialogError = '请填写电话';
        return false;
      }
      if (!this.dialog.email) {
        this.dialogError = '请填写邮箱';
        return false;
      }

      this.payForm = {
        out_trade_no: `test${new Date().getTime()}`,
        total_fee: this.activePrice === 2 ? this.info.groupPrice : this.info.price,
        body: this.info.title,
      };

      const query = this.$Bmob.Query('_User');
      query.get(this.$store.state.user.objectId).then(user => {
        user.set('name', this.dialog.name);
        user.set('mobilePhoneNumber', this.dialog.phone);
        user.set('email', this.dialog.email);
        user.set('wechatId', this.dialog.wechat);
        user.save().then(() => {
          this.step = 3;
        }).catch(err => {
          console.log(err);
          if (err.code === 209) {
            this.dialogError = '该手机号码已经存在';
          }
          if (err.code === 301) {
            this.dialogError = '邮箱格式不正确';
          }
        });
      })
    },

    getReslut(item) {
      const query = this.$Bmob.Query('order_list');
      query.set("payReslut", item);
      query.set("sort", 'product');
      const productPointer = this.$Bmob.Pointer('product');
      const productID = productPointer.set(this.$route.query.id);
      query.set('product', productID);
      const userPointer = this.$Bmob.Pointer('_User');
      const userID = userPointer.set(this.$store.state.user.objectId);
      query.set('user', userID);
      query.save().then(() => {
        const proquery = this.$Bmob.Query('product_person');
        const userPointer = this.$Bmob.Pointer('_User')
        const userID = userPointer.set(this.$store.state.user.objectId)
        proquery.set('user', userID);
        const productPointer = this.$Bmob.Pointer('product')
        const productID = productPointer.set(this.$route.query.id)
        proquery.set('product', productID);
        proquery.set('isBuyed', true);
        proquery.save().then(() => {
          this.step = 4;
          this.payReslut = item;
        });
      }).catch(err => {
        console.log(err);
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
                a {
                  margin-left: 10px;
                  color: #888;
                }
              }
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
          margin-top: 50px;
          padding: 25px 0 63px 0;
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

          .buy-steps {
            width: 100%;
            text-align: center;
            .step {
              display: inline-block;
              vertical-align: middle;
              padding: 0 16px;
              .count {
                margin: auto;
                width: 38px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                border-radius: 50%;
                border: 1px solid #979797;
                font-size: 16px;
                color: #262626;
                &.active {
                  background-color: #FF5D01;
                  border: 1px solid #FF5D01;
                  color: #fff;
                }
              }
              .step-t {
                margin-top: 13px;
                font-size: 12px;
                line-height: 17px;
                text-align: center;
                color: #262626;
              }
            }
            .line {
              display: inline-block;
              vertical-align: top;
              margin-top: 19px;
              width: 52px;
              height: 1px;
              background-color: #979797;
            }
          }

          .buy-box {
            padding-top: 50px;
            .box-form {
              margin: auto;
              width: 280px;
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
                &:last-child {
                  margin-bottom: 0;
                }
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
                margin: 10px 0 30px 0;
                font-size: 12px;
                height: 17px;
                color: #E55D5D;
              }
              .text {
                margin-bottom: 17px;
                text-align: center;
                color: #262626;
                font-size: 14px;
                line-height: 20px;
                span {
                  margin: 0 10px;
                  font-size: 24px;
                  color: #FF5D01;
                }
              }
              .btn {
                width: 280px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border: 1px solid #6BCC03;
                border-radius: 2px;
                font-size: 14px;
                color: #333333;
                cursor: pointer;
                i {
                  color: #09BB07;
                  margin-right: 10px;
                }
              }
            }
          }

          .select-price {
            margin-top: 50px;
            margin-bottom: 11px;
            text-align: center;
            color: #262626;
            font-size: 14px;
            line-height: 20px;
            span {
              margin: 0 10px;
              font-size: 24px;
              color: #FF5D01;
            }
          }
          .qrcode-box {
            margin:auto;
            width:143px;
            height:143px;
          }
          .wechat-text {
            margin-top: 15px;
            font-size:16px;
            line-height: 22px;
            text-align: center;
            color: #262626;
          }
          .pay-result {
            padding: 50px 0;
            text-align: center;
            i {
              color: #00c250;
              font-size:48px;
            }
            .t {
              margin-top: 30px;
              color: #FF5D01;
              font-size: 16px;
              line-height: 22px;
            }
            &.fail {
              i {
                color: #262626;
              }
              .t {
                color: #262626;
              }
            }
          }

          // .buy-flex {
          //   width: 50%;
          //   box-sizing: border-box;
          //   .wechat-qrcode {
          //     display: inline-block;
          //     width: 170px;
          //     height: 170px;
          //     img {
          //       display: block;
          //       width: 100%;
          //     }
          //     .text {
          //       text-align: center;
          //       font-size: 12px;
          //       color: #979797;
          //     }
          //   }
          //   .title {
          //     margin-bottom: 30px;
          //     font-size: 12px;
          //     font-family: PingFangSC;
          //     color: #262626;
          //     line-height: 17px;
          //     .t {
          //       margin-right: 10px;
          //       span {
          //         font-size: 24px;
          //         color: #FF5D01;
          //       }
          //     }
          //   }
          //   .input-group {
          //     display: flex;
          //     margin-bottom: 20px;
          //     padding: 0px 10px;
          //     width: 280px;
          //     height: 36px;
          //     line-height: 34px;
          //     border: 1px solid #979797;
          //     font-size: 12px;
          //     box-sizing: border-box;
          //     span {
          //       color: #888;
          //       width: 70px;
          //     }
          //     input {
          //       padding: 0;
          //       height: 34px;
          //       border: none;
          //       outline: none;
          //       box-sizing: border-box;
          //     }
          //   }
          //   .error {
          //     margin-bottom: 30px;
          //     font-size: 12px;
          //     height: 17px;
          //     color: #E55D5D;
          //   }
          //   .btn {
          //     width: 280px;
          //     height: 40px;
          //     line-height: 40px;
          //     text-align: center;
          //     background-color: rgba(244,117,29,0.30);
          //     border: 1px solid #F4751D;
          //     border-radius: 2px;
          //     color: #F4751D;
          //     cursor: pointer;
          //   }
          // }
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
      margin-bottom: 20px;
      padding-top: 60px;
      min-height: calc(100vh - 50px - 574px - 311px - 20px);
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